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


export async function enviarCodigo2FA(email: string, codigo: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: `"Soporte Agencia de Viajes" <${process.env.SMTP_FROM}>`,
    to: email,
    subject: 'Código de verificación 2FA',
    html: `
      <p>Has iniciado sesión y tienes activado el sistema de verificación en dos pasos.</p>
      <p>Tu código de verificación es:</p>
      <h2>${codigo}</h2>
      <p>Este código expira en 5 minutos.</p>
    `,
  })
}
