import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

// Verify email configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Email configuration error:', error)
  } else {
    console.log('Email server is ready to send messages')
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Daryl backend is running' })
})

// Send contact form email
app.post('/api/send-contact-email', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.CONTACT_EMAIL,
      subject: `Nouveau formulaire de contact : ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #0369a1; margin-bottom: 5px; }
            .value { background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #0ea5e9; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Nouveau Message de Contact</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">De :</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email :</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">Sujet :</div>
                <div class="value">${subject}</div>
              </div>
              <div class="field">
                <div class="label">Message :</div>
                <div class="value">${message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    }

    // Confirmation email to sender
    const confirmationMailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Merci de nous avoir contactés - Daryl',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #0ea5e9; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 32px;">Daryl.</h1>
            </div>
            <div class="content">
              <h2>Merci de nous avoir contactés !</h2>
              <p>Bonjour ${name},</p>
              <p>Nous avons bien reçu votre message et nous vous remercions d'avoir pris le temps de nous contacter. Nous examinerons votre demande et vous répondrons dans les plus brefs délais.</p>
              <p><strong>Votre message :</strong></p>
              <p style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #0ea5e9;">
                ${message.replace(/\n/g, '<br>')}
              </p>
              <p>En attendant, n'hésitez pas à explorer notre portfolio et notre blog pour plus d'insights sur la Data Science, l'IA et l'Innovation Digitale.</p>
              <p>Cordialement,<br><strong>L'équipe Daryl</strong></p>
            </div>
          </div>
        </body>
        </html>
      `
    }

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(confirmationMailOptions)
    ])

    res.json({ success: true, message: 'Emails sent successfully' })
  } catch (error) {
    console.error('Email sending error:', error)
    res.status(500).json({ error: 'Failed to send email' })
  }
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Daryl backend server running on http://localhost:${PORT}`)
})
