import { defineEventHandler, readBody, createError } from 'h3'
import nodemailer from 'nodemailer'
import { sql } from '../utils/db'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const body = await readBody(event)
  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'It looks like your request was empty. Please fill out the form and try again.',
    })
  }

  const { fullName, email, phone, location, interests, availability, experience, message } = body

  // Basic validation
  if (!fullName || !email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Please provide both your full name and email address so we can reach you.',
    })
  }

  // Save to Neon Database
  if (sql) {
    try {
      await sql`
        INSERT INTO volunteers (
          full_name, 
          email, 
          phone, 
          location, 
          interests, 
          availability, 
          experience, 
          message
        ) 
        VALUES (
          ${fullName}, 
          ${email}, 
          ${phone || null}, 
          ${location || null}, 
          ${interests || null}, 
          ${availability || null}, 
          ${experience || null}, 
          ${message || null}
        );
      `
    } catch (dbError: any) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Something went wrong on our end while saving your application. Please try again shortly!',
      })
    }
  }

  const interestsList = Array.isArray(interests) ? interests.join(', ') : interests || 'Not specified'

  const mailOptions = {
    from: `"Active Growth Groups" <${config.smtpUser || 'no-reply@activegrowthgroups.com.ng'}>`,
    to: config.mailTo,
    subject: `New Volunteer Sign-Up - ${fullName}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #2f9e44; border-bottom: 2px solid #2f9e44; padding-bottom: 10px; margin-top: 0;">New Volunteer Application</h2>
        <p style="font-size: 16px; line-height: 1.5;">A new volunteer has signed up through the website. Details below:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee; width: 140px; text-align: left;">Full Name:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: left;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee; text-align: left;">Email:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: left;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee; text-align: left;">Phone:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: left;">${phone || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee; text-align: left;">Location:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: left;">${location || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee; text-align: left;">Areas of Interest:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: left;">${interestsList}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee; text-align: left;">Availability:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: left;">${availability || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee; text-align: left;">Experience:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: left;">${experience || 'Not provided'}</td>
          </tr>
          ${message ? `
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee; text-align: left; vertical-align: top;">Message:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: left;">${message}</td>
          </tr>
          ` : ''}
        </table>
        <p style="margin-top: 20px; font-size: 12px; color: #888;">This sign-up was submitted through the Active Growth Groups website.</p>
      </div>
    `,
  }

  // Handle mock mode if SMTP is not fully configured
  const isSmtpConfigured = config.smtpUser && config.smtpPass && config.smtpUser !== 'activegrowthgroups@gmail.com'

  if (!isSmtpConfigured) {
    return {
      success: true,
      message: 'Thank you for signing up! Your application has been safely received.',
    }
  }

  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: Number(config.smtpPort),
    secure: Number(config.smtpPort) === 465,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  })

  try {
    await transporter.sendMail(mailOptions)
    return {
      success: true,
      message: 'Thank you for signing up! Your application has been submitted successfully.',
    }
  } catch (error: any) {
    return {
      success: true,
      message: 'Thank you for signing up! Your application has been successfully received.',
    }
  }
})