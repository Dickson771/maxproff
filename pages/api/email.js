const nodemailer = require('nodemailer')

const password = process.env.MAIL_PASSWORD
const email = process.env.MAIL_USERNAME

let transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: email,
    pass: password,
  },
})

let sendEmail = (subject, text, html) => {
  let mailOptions = {
    from: email,
    to: email,
    subject: subject,
    text: text,
    html: html,
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error)
      }
      resolve(info)
    })
  })
}

const emailEndpoint = async (req, res) => {
  const { name, email, message, subject } = req.body
  const text = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  const html = `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`

  try {
    const info = await sendEmail(subject, text, html)
    res.status(200).json({ message: 'Email sent', info })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export default emailEndpoint
