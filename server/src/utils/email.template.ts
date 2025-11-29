interface EmailTemplateProps {
  name: string;
  clientURL: string
}


export function createWelcomeEmailTemplate({ name, clientURL }: EmailTemplateProps) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to AxionX</title>
  </head>
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin:0; padding:0; background-color:#f4f6f8;">
    
    <table width="100%" cellspacing="0" cellpadding="0" style="max-width:600px; margin:0 auto;">
      
      <!-- Header -->
      <tr>
        <td style="background: linear-gradient(135deg, #4D9DE0, #2A6FDB); padding:40px 20px; text-align:center; border-radius:12px 12px 0 0;">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/1032/1032925.png" 
            alt="AxionX Logo" 
            style="width:90px; height:90px; border-radius:50%; background:#fff; padding:10px;"
          />
          <h1 style="color:white; margin-top:20px; font-size:30px; font-weight:600;">Welcome to AxionX!</h1>
        </td>
      </tr>

      <!-- Body Content -->
      <tr>
        <td style="background:white; padding:35px; border-radius:0 0 12px 12px; box-shadow:0 4px 18px rgba(0,0,0,0.06);">
          
          <p style="font-size:18px; margin:0; color:#2A6FDB;">
            <strong>Hello ${name},</strong>
          </p>

          <p style="margin-top:15px; font-size:15px; color:#555;">
            We're thrilled to welcome you to <strong>AxionX</strong> — where fast, modern, and secure communication meets simplicity.
          </p>

          <!-- Getting Started Box -->
          <div 
            style="
              background:#f7f9fc; 
              padding:25px; 
              border-radius:10px; 
              margin:25px 0; 
              border-left:4px solid #4D9DE0;
            "
          >
            <p style="font-size:16px; margin:0 0 12px 0;"><strong>Here's how to get started:</strong></p>

            <ul style="margin:0; padding-left:20px; color:#444;">
              <li style="margin-bottom:10px;">Update your profile</li>
              <li style="margin-bottom:10px;">Add or invite your contacts</li>
              <li style="margin-bottom:10px;">Start chats instantly</li>
              <li>Share media, files, and more</li>
            </ul>
          </div>

          <!-- Button -->
          <div style="text-align:center; margin:35px 0;">
            <a 
              href="${clientURL}" 
              style="
                background: linear-gradient(135deg, #4D9DE0, #2A6FDB);
                color:white;
                padding:14px 32px;
                border-radius:40px;
                font-weight:600;
                font-size:15px;
                text-decoration:none;
                display:inline-block;
              "
            >
              Go to AxionX
            </a>
          </div>

          <p style="font-size:14px; color:#555;">If you ever need support, we're here 24/7 to help you out.</p>
          <p style="margin-top:20px; font-size:14px; color:#555;">Cheers,<br><strong>The AxionX Team</strong></p>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="text-align:center; padding:20px; color:#888; font-size:12px;">
          <p style="margin:0;">© 2025 AxionX. All rights reserved.</p>
          <p style="margin:8px 0;">
            <a href="#" style="color:#2A6FDB; margin:0 10px; text-decoration:none;">Privacy Policy</a>
            <a href="#" style="color:#2A6FDB; margin:0 10px; text-decoration:none;">Terms</a>
            <a href="#" style="color:#2A6FDB; margin:0 10px; text-decoration:none;">Support</a>
          </p>
        </td>
      </tr>

    </table>

  </body>
  </html>
  `;
}