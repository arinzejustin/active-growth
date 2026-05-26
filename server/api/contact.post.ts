import { defineEventHandler, readBody, createError } from 'h3'
import nodemailer from 'nodemailer'
import { sql } from '../utils/db'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const body = await readBody(event)
  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'It looks like your request was empty. Please write a message and try again.',
    })
  }

  const { name, email, subject, message } = body

  if (!name || !email || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Please make sure to fill in your name, email, and message so we can get back to you.',
    })
  }

  // Save to Neon Database
  if (sql) {
    try {
      await sql`
        INSERT INTO contacts (
          name, 
          email, 
          subject, 
          message
        ) 
        VALUES (
          ${name}, 
          ${email}, 
          ${subject || null}, 
          ${message}
        );
      `
    } catch (dbError: any) {
      throw createError({
        statusCode: 500,
        statusMessage: 'We ran into a small hitch sending your message. Please try again in a little bit!',
      })
    }
  }

  const mailOptions = {
    from: `"Active Growth Groups" <${config.smtpUser || 'no-reply@activegrowthgroups.com.ng'}>`,
    to: config.mailTo,
    subject: `New Contact Form Message: ${subject || 'General Inquiry'} - ${name}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #2f9e44; border-bottom: 2px solid #2f9e44; padding-bottom: 10px; margin-top: 0;">New Contact Inquiry</h2>
        <p style="font-size: 16px; line-height: 1.5;">You received a new message through the website contact form:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee; width: 140px; text-align: left;">Name:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: left;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee; text-align: left;">Email:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: left;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee; text-align: left;">Subject:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: left;">${subject || 'General Inquiry'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee; text-align: left; vertical-align: top;">Message:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: left;">${message}</td>
          </tr>
        </table>
        <p style="margin-top: 20px; font-size: 12px; color: #888;">This message was submitted through the Active Growth Groups website contact page.</p>
      </div>
    `,
  }

  const isSmtpConfigured = config.smtpUser && config.smtpPass && config.smtpUser !== 'activegrowthgroups@gmail.com'

  if (!isSmtpConfigured) {
    return {
      success: true,
      message: 'Thank you for reaching out! Your message has been safely received.',
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
      message: 'Thank you for reaching out! Your message has been sent successfully.',
    }
  } catch (error: any) {
    return {
      success: true,
      message: 'Thank you for reaching out! Your message has been successfully received.',
    }
  }
})