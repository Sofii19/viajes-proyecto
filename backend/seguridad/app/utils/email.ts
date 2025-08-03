import nodemailer from 'nodemailer'

export async function enviarCorreoActivacion(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // true para puerto 465, false para 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

    const urlActivacion = `${process.env.BACKEND_URL}/auth/activar/${token}`

  await transporter.sendMail({
    from: `"Soporte Agencia de Viajes" <${process.env.SMTP_FROM}>`,
    to: email,
    subject: 'Activa tu cuenta',
    html: `
      <p>Gracias por registrarte. Para activar tu cuenta, haz clic en el siguiente enlace:</p>
      <a href="${urlActivacion}">${urlActivacion}</a>
    `,
  })
}
