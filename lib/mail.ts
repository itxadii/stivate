import nodemailer from "nodemailer"

export async function sendEnquiryEmail(enquiry: {
  name: string
  email: string
  whatsapp: string
  businessType: string
  erpSystem: string
  challenge: string
}) {
  const host = process.env.SMTP_HOST
  const port = parseInt(process.env.SMTP_PORT || "587")
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const from = process.env.SMTP_FROM || "hello@stivate.com"
  const to = "adityawaghmarex@gmail.com, kolpeprathamesh@gmail.com"

  if (!host || !user || !pass) {
    console.warn("SMTP configuration is missing in environment variables. Skipping email sending.")
    console.log(`Mock Email Notification for Enquiry to ${to}:`, enquiry)
    return
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  })

  const html = `
    <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap');
          * {
            font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8fafc;">
        <div style="font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); color: #0f172a;">
          
          <!-- Header Logo (Top Left Corner) -->
          <div style="text-align: left; margin-bottom: 25px; border-bottom: 1px solid #f1f5f9; padding-bottom: 20px; background-color: #ffffff !important; border-radius: 12px 12px 0 0;">
            <div style="background-color: #ffffff !important; padding: 10px 0; border-radius: 8px; display: inline-block;">
              <img src="https://stivate.com/logo.png" alt="Stivate Logo" style="max-height: 90px; height: 90px; width: auto; display: block; background-color: #ffffff !important;" />
            </div>
          </div>

          <h2 style="font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #0f172a; margin-top: 0; font-size: 20px; font-weight: 800; text-align: left;">New operational process audit request submitted!</h2>
          <p style="font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #475569; font-size: 14px; text-align: left; margin-bottom: 25px;">An enquiry has been received directly from the Stivate landing page contact form. The details are below:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px; font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;">
            <tr>
              <td style="padding: 12px 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #334155; width: 180px;">Contact Name</td>
              <td style="padding: 12px 10px; border-bottom: 1px solid #f1f5f9; color: #475569;">${enquiry.name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #334155;">Corporate Email</td>
              <td style="padding: 12px 10px; border-bottom: 1px solid #f1f5f9; color: #475569;"><a href="mailto:${enquiry.email}" style="color: #2563eb; text-decoration: underline;">${enquiry.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #334155;">WhatsApp / Phone</td>
              <td style="padding: 12px 10px; border-bottom: 1px solid #f1f5f9; color: #475569;"><a href="https://wa.me/${enquiry.whatsapp.replace(/[^0-9]/g, '')}" style="color: #2563eb; text-decoration: underline;">${enquiry.whatsapp}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #334155;">Industry Sector</td>
              <td style="padding: 12px 10px; border-bottom: 1px solid #f1f5f9; color: #475569;">${enquiry.businessType}</td>
            </tr>
            <tr>
              <td style="padding: 12px 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #334155; vertical-align: top;">Current ERP / System</td>
              <td style="padding: 12px 10px; border-bottom: 1px solid #f1f5f9; color: #475569; white-space: pre-wrap; line-height: 1.5;">${enquiry.erpSystem}</td>
            </tr>
            <tr>
              <td style="padding: 12px 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #334155; vertical-align: top;">Biggest Bottleneck</td>
              <td style="padding: 12px 10px; border-bottom: 1px solid #f1f5f9; color: #475569; white-space: pre-wrap; line-height: 1.5;">${enquiry.challenge}</td>
            </tr>
          </table>

          <div style="margin-top: 35px; text-align: left;">
            <a href="https://stivate.com/admin/enquiries" style="font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: limegreen; color: white; padding: 12px 28px; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              Open in Stivate CRM
            </a>
          </div>
        </div>
      </body>
    </html>
  `

  try {
    await transporter.sendMail({
      from,
      to,
      subject: `[New Enquiry] ${enquiry.name} - ${enquiry.businessType}`,
      html,
    })
    console.log(`Enquiry email notification successfully sent to ${to}`)
  } catch (error) {
    console.error("Failed to send enquiry email:", error)
  }
}
