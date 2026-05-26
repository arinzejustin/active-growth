import { defineEventHandler, readMultipartFormData, createError } from 'h3'
import nodemailer from 'nodemailer'
import { sql } from '../utils/db'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  // Read multipart form data
  const multipartData = await readMultipartFormData(event)
  if (!multipartData) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid form data. Expected multipart form data.',
    })
  }

  let name = ''
  let email = ''
  let amount = ''
  let currency = 'NGN'
  let proofFile: any = null

  // Extract fields from the multipart form
  for (const part of multipartData) {
    if (part.name === 'name') {
      name = part.data.toString('utf-8')
    } else if (part.name === 'email') {
      email = part.data.toString('utf-8')
    } else if (part.name === 'amount') {
      amount = part.data.toString('utf-8')
    } else if (part.name === 'currency') {
      currency = part.data.toString('utf-8')
    } else if (part.name === 'proof') {
      proofFile = part
    }
  }

  // Validate required fields
  if (!name.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name is required.',
    })
  }

  if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'A valid donation amount is required.',
    })
  }

  // Validate that a proof file was attached
  if (!proofFile || !proofFile.data || !proofFile.filename) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Proof of payment file is required.',
    })
  }

  const exchangeRate = 1600
  const parsedAmount = Number(amount)
  const convertedAmountNgn = currency === 'USD' ? parsedAmount * exchangeRate : parsedAmount

  // Save to Neon Database
  if (sql) {
    try {
      const fileBase64 = proofFile.data.toString('base64')
      await sql`
        INSERT INTO donations (
          name, 
          email, 
          amount, 
          currency, 
          converted_amount_ngn, 
          proof_filename, 
          proof_content_type, 
          proof_data
        ) 
        VALUES (
          ${name}, 
          ${email || null}, 
          ${parsedAmount}, 
          ${currency}, 
          ${convertedAmountNgn}, 
          ${proofFile.filename}, 
          ${proofFile.type || null}, 
          ${fileBase64}
        );
      `
      console.log('[DB] Donation proof successfully saved to Neon.')
    } catch (dbError: any) {
      console.error('[DB] Error saving donation proof to database:', dbError)
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to save donation proof: ${dbError.message || 'Database error'}`,
      })
    }
  }

  // Prepare SMTP parameters
  const isSmtpConfigured = config.smtpUser && config.smtpPass && config.smtpUser !== 'activegrowthgroups@gmail.com'

  const mailOptions = {
    from: `"Active Growth Groups" <${config.smtpUser || 'no-reply@activegrowthgroups.com.ng'}>`,
    to: config.mailTo,
    subject: `New Donation Proof of Payment - ${name}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #2f9e44; border-bottom: 2px solid #2f9e44; padding-bottom: 10px; margin-top: 0;">Donation Proof Submitted</h2>
        <p style="font-size: 16px; line-height: 1.5;">A donor has uploaded a proof of payment for a donation. Details below:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee; width: 120px; text-align: left;">Name:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: left;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee; text-align: left;">Email:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: left;">${email || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee; text-align: left;">Amount:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-size: 16px; color: #2f9e44; font-weight: bold; text-align: left;">
              ${currency === 'USD' ? '$' + parsedAmount.toLocaleString('en-US') : '₦' + parsedAmount.toLocaleString('en-US')}
              ${currency === 'USD' ? `<span style="font-size: 12px; font-weight: normal; color: #666; margin-left: 8px;">(₦${convertedAmountNgn.toLocaleString('en-US')} NGN equivalent at ₦${exchangeRate}/$)</span>` : ''}
            </td>
          </tr>
        </table>
        <p style="margin-top: 20px; font-size: 12px; color: #888;">The proof of payment file is attached to this email.</p>
      </div>
    `,
    attachments: [
      {
        filename: proofFile.filename,
        content: proofFile.data,
        contentType: proofFile.type,
      },
    ],
  }

  // Handle mock mode if SMTP is not fully configured
  if (!isSmtpConfigured) {
    console.warn('[MAIL SERVICE] SMTP credentials are not configured or are placeholder values. Email is in MOCK mode.')
    console.log('[MAIL SERVICE] --- MOCK EMAIL LOG ---')
    console.log(`[MAIL SERVICE] To: ${mailOptions.to}`)
    console.log(`[MAIL SERVICE] From: ${mailOptions.from}`)
    console.log(`[MAIL SERVICE] Subject: ${mailOptions.subject}`)
    console.log(`[MAIL SERVICE] Attachment Name: ${proofFile.filename}`)
    console.log(`[MAIL SERVICE] Attachment Size: ${proofFile.data.length} bytes`)
    console.log('[MAIL SERVICE] -----------------------')
    
    return {
      success: true,
      message: 'Proof of payment saved to DB & email mocked successfully.',
    }
  }

  // Set up nodemailer transport
  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: Number(config.smtpPort),
    secure: Number(config.smtpPort) === 465, // true for 465, false for 587
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  })

  try {
    await transporter.sendMail(mailOptions)
    return {
      success: true,
      message: 'Proof of payment saved to DB and email sent successfully.',
    }
  } catch (error: any) {
    console.error('[MAIL SERVICE] Error sending email via SMTP:', error)
    throw createError({
      statusCode: 500,
      statusMessage: `Saved to DB, but failed to send email: ${error.message || 'Unknown SMTP error'}`,
    })
  }
})

