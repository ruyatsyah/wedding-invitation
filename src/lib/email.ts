import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true', // true for port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendPasswordResetEmail(toEmail: string, resetUrl: string, userName: string) {
  const mailOptions = {
    from: `"${process.env.SMTP_FROM_NAME || 'Wedding Invitation'}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
    to: toEmail,
    subject: 'Reset Kata Sandi Akun Anda',
    html: `
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Kata Sandi</title>
      </head>
      <body style="margin:0;padding:0;background-color:#f9fafb;font-family:'Segoe UI',sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:40px 0;">
          <tr>
            <td align="center">
              <table width="580" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
                <!-- Header -->
                <tr>
                  <td style="background:#000;padding:32px;text-align:center;">
                    <h1 style="color:#fff;margin:0;font-size:22px;font-weight:700;letter-spacing:-0.5px;">Wedding Invitation</h1>
                  </td>
                </tr>
                <!-- Body -->
                <tr>
                  <td style="padding:40px 40px 24px;">
                    <h2 style="color:#111;font-size:20px;margin:0 0 12px;font-weight:700;">Reset Kata Sandi</h2>
                    <p style="color:#6b7280;font-size:14px;line-height:1.6;margin:0 0 24px;">
                      Halo <strong>${userName}</strong>,<br><br>
                      Kami menerima permintaan untuk mereset kata sandi akun Anda. Klik tombol di bawah ini untuk membuat kata sandi baru. Tautan ini hanya berlaku selama <strong>1 jam</strong>.
                    </p>
                    <div style="text-align:center;margin:32px 0;">
                      <a href="${resetUrl}" style="display:inline-block;background:#000;color:#fff;text-decoration:none;padding:14px 32px;border-radius:10px;font-weight:700;font-size:14px;letter-spacing:0.3px;">
                        Reset Kata Sandi
                      </a>
                    </div>
                    <p style="color:#9ca3af;font-size:12px;line-height:1.6;margin:0;">
                      Jika tombol di atas tidak berfungsi, salin dan tempel tautan berikut ke browser Anda:<br>
                      <a href="${resetUrl}" style="color:#374151;word-break:break-all;">${resetUrl}</a>
                    </p>
                  </td>
                </tr>
                <!-- Divider -->
                <tr>
                  <td style="padding:0 40px;">
                    <hr style="border:none;border-top:1px solid #e5e7eb;margin:0;">
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="padding:24px 40px;text-align:center;">
                    <p style="color:#9ca3af;font-size:12px;margin:0;">
                      Jika Anda tidak meminta reset kata sandi, abaikan email ini. Akun Anda tetap aman.<br>
                      &copy; ${new Date().getFullYear()} Wedding Invitation. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
}
