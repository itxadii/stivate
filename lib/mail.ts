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
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
      <div style="text-align: center; margin-bottom: 25px; border-bottom: 1px solid #f1f5f9; padding-bottom: 20px;">
        <img src="https://stivate.com/logo.png" alt="Stivate Logo" style="max-height: 45px; width: auto; display: inline-block;" />
      </div>
      
      <h2 style="color: #0f172a; margin-top: 0; font-size: 20px; font-weight: 800; text-align: center;">New operational process audit request submitted!</h2>
      <p style="color: #475569; font-size: 14px; text-align: center; margin-bottom: 25px;">An enquiry has been received directly from the Stivate landing page contact form. The details are below:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px;">
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

      <div style="margin-top: 35px; text-align: center;">
        <a href="https://stivate.com/admin/enquiries" style="background-color: limegreen; color: white; padding: 12px 28px; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          Open in Stivate CRM
        </a>
      </div>
    </div>
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
