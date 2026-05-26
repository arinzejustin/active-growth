import { defineEventHandler, readMultipartFormData, createError } from 'h3'
import nodemailer from 'nodemailer'

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
  let proofFile: any = null

  // Extract fields from the multipart form
  for (const part of multipartData) {
    if (part.name === 'name') {
      name = part.data.toString('utf-8')
    } else if (part.name === 'email') {
      email = part.data.toString('utf-8')
    } else if (part.name === 'amount') {
      amount = part.data.toString('utf-8')
    } else if (part.name === 'proof') {
      proofFile = part
    }
  }

  // Validate that a proof file was attached
  if (!proofFile || !proofFile.data || !proofFile.filename) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Proof of payment file is required.',
    })
  }

  // Prepare SMTP parameters
  const isSmtpConfigured = config.smtpUser && config.smtpPass && config.smtpUser !== 'activegrowthgroups@gmail.com'

  const mailOptions = {
    from: `"Active Growth Groups" <${config.smtpUser || 'no-reply@activegrowthgroups.com.ng'}>`,
    to: config.mailTo,
    subject: `New Donation Proof of Payment - ${name || 'Anonymous'}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #2f9e44; border-bottom: 2px solid #2f9e44; padding-bottom: 10px; margin-top: 0;">Donation Proof Submitted</h2>
        <p style="font-size: 16px; line-height: 1.5;">A donor has uploaded a proof of payment for a donation. Details below:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee; width: 120px; text-align: left;">Name:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: left;">${name || 'Anonymous'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee; text-align: left;">Email:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: left;">${email || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee; text-align: left;">Amount:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-size: 16px; color: #2f9e44; font-weight: bold; text-align: left;">${amount ? '₦' + Number(amount).toLocaleString('en-US') : 'Not specified'}</td>
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
      message: 'Proof of payment received successfully (Local Dev Mode: SMTP not configured).',
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
      message: 'Proof of payment email sent successfully.',
    }
  } catch (error: any) {
    console.error('[MAIL SERVICE] Error sending email via SMTP:', error)
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to send email: ${error.message || 'Unknown SMTP error'}`,
    })
  }
})
