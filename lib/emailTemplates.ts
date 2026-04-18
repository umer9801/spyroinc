export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export function getAdminEmailHtml(data: ContactPayload): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Submission</title>
  <style>
    /* Reset styles */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; }
    
    /* Responsive styles - simplified */
    @media screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .mobile-padding { padding-left: 20px !important; padding-right: 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color: #f6f6f6;">
  <!-- Main Wrapper Table with Light Neutral Background -->
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#f6f6f6" style="background-color: #f6f6f6;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <!-- Email Container - White Background for High Contrast on both Modes -->
        <table role="presentation" class="container" border="0" cellpadding="0" cellspacing="0" width="560" style="max-width: 560px; width: 100%; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <tr>
            <td bgcolor="#e94560" align="center" style="padding: 30px 40px; background: linear-gradient(90deg, #e94560 0%, #c73e54 100%);">
              <h1 style="margin: 0; font-family: 'Segoe UI', system-ui, sans-serif; font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em;">📬 New Contact Submission</h1>
              <p style="margin: 5px 0 0 0; font-family: 'Segoe UI', system-ui, sans-serif; font-size: 14px; color: rgba(255,255,255,0.9);">Someone reached out from your website</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td class="mobile-padding" style="padding: 40px; background-color: #ffffff;"> 
              
              <!-- Field: Submitted By -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding-bottom: 5px; font-family: 'Segoe UI', system-ui, sans-serif; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #666666;">Submitted by</td>
                </tr>
                <tr>
                  <td style="padding-bottom: 20px; border-bottom: 1px solid #eeeeee; font-family: 'Segoe UI', system-ui, sans-serif; font-size: 16px; color: #333333; font-weight: 500;">
                    ${escapeHtml(data.name)} &lt;<a href="mailto:${escapeHtml(data.email)}" style="color: #e94560; text-decoration: none;">${escapeHtml(data.email)}</a>&gt;
                  </td>
                </tr>
                <tr><td height="20" style="font-size: 0; line-height: 0;">&nbsp;</td></tr>

                <!-- Field: Phone -->
                <tr>
                  <td style="padding-bottom: 5px; font-family: 'Segoe UI', system-ui, sans-serif; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #666666;">Phone</td>
                </tr>
                <tr>
                  <td style="padding-bottom: 20px; border-bottom: 1px solid #eeeeee; font-family: 'Segoe UI', system-ui, sans-serif; font-size: 16px; color: #333333; font-weight: 500;">
                    ${escapeHtml(data.phone)}
                  </td>
                </tr>
                 <tr><td height="20" style="font-size: 0; line-height: 0;">&nbsp;</td></tr>

                <!-- Field: Service -->
                <tr>
                  <td style="padding-bottom: 5px; font-family: 'Segoe UI', system-ui, sans-serif; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #666666;">Service</td>
                </tr>
                <tr>
                  <td style="padding-bottom: 20px; border-bottom: 1px solid #eeeeee; font-family: 'Segoe UI', system-ui, sans-serif; font-size: 16px; color: #333333; font-weight: 500;">
                    ${escapeHtml(data.service)}
                  </td>
                </tr>
                 <tr><td height="20" style="font-size: 0; line-height: 0;">&nbsp;</td></tr>

                <!-- Field: Message -->
                <tr>
                  <td style="padding-bottom: 5px; font-family: 'Segoe UI', system-ui, sans-serif; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #666666;">Message</td>
                </tr>
                <tr>
                  <td style="background-color: #f9f9f9; border-radius: 8px; padding: 16px 20px; border-left: 4px solid #e94560; font-family: 'Segoe UI', system-ui, sans-serif; font-size: 16px; line-height: 1.6; color: #333333;">
                    ${escapeHtml(data.message)}
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 20px 40px; background-color: #f9f9f9; border-top: 1px solid #eeeeee;">
              <p style="margin: 0; font-family: 'Segoe UI', system-ui, sans-serif; font-size: 12px; color: #888888;">
                This email was sent from your contact form. Reply to <a href="mailto:${escapeHtml(data.email)}" style="color: #e94560; text-decoration: none;">${escapeHtml(data.email)}</a> to respond.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function getUserConfirmationEmailHtml(data: ContactPayload): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Request Received</title>
  <style>
    /* Reset styles */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; }

    /* Responsive styles - simplified */
    @media screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .mobile-padding { padding-left: 20px !important; padding-right: 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color: #f6f6f6;">
  <!-- Main Wrapper Table with Light Neutral Background -->
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#f6f6f6" style="background-color: #f6f6f6;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <!-- Email Container - White Background for High Contrast on both Modes -->
        <table role="presentation" class="container" border="0" cellpadding="0" cellspacing="0" width="520" style="max-width: 520px; width: 100%; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <tr>
            <td bgcolor="#238636" align="center" style="padding: 30px 40px; background: linear-gradient(90deg, #238636 0%, #2ea043 100%);">
              <h1 style="margin: 0; font-family: 'Segoe UI', system-ui, sans-serif; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em;">✓ Request Received</h1>
              <p style="margin: 5px 0 0 0; font-family: 'Segoe UI', system-ui, sans-serif; font-size: 14px; color: rgba(255,255,255,0.9);">We got your message and will get back to you soon.</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td class="mobile-padding" style="padding: 40px; background-color: #ffffff;">
              <p style="margin: 0 0 24px 0; font-family: 'Segoe UI', system-ui, sans-serif; font-size: 16px; line-height: 1.6; color: #444444;">
                Hi ${escapeHtml(data.name)}, thank you for reaching out. Here’s a copy of what you sent:
              </p>
              
              <!-- Card-like Data Table -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f9f9f9; border-radius: 10px; margin-bottom: 16px; border: 1px solid #eeeeee;">
                <tr>
                  <td style="padding: 20px;">
                    <!-- Rows -->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <!-- Name -->
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; font-family: 'Segoe UI', system-ui, sans-serif; font-size: 15px; color: #666666;">Name</td>
                        <td align="right" style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; font-family: 'Segoe UI', system-ui, sans-serif; font-size: 15px; color: #222222; font-weight: 500;">${escapeHtml(data.name)}</td>
                      </tr>
                      <!-- Email -->
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; font-family: 'Segoe UI', system-ui, sans-serif; font-size: 15px; color: #666666;">Email</td>
                        <td align="right" style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; font-family: 'Segoe UI', system-ui, sans-serif; font-size: 15px; color: #222222; font-weight: 500;">${escapeHtml(data.email)}</td>
                      </tr>
                      <!-- Phone -->
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; font-family: 'Segoe UI', system-ui, sans-serif; font-size: 15px; color: #666666;">Phone</td>
                        <td align="right" style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; font-family: 'Segoe UI', system-ui, sans-serif; font-size: 15px; color: #222222; font-weight: 500;">${escapeHtml(data.phone)}</td>
                      </tr>
                      <!-- Service -->
                      <tr>
                        <td style="padding: 8px 0; font-family: 'Segoe UI', system-ui, sans-serif; font-size: 15px; color: #666666;">Service</td>
                        <td align="right" style="padding: 8px 0; font-family: 'Segoe UI', system-ui, sans-serif; font-size: 15px; color: #222222; font-weight: 500;">${escapeHtml(data.service)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <div style="font-family: 'Segoe UI', system-ui, sans-serif; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #888888; margin-bottom: 6px;">Your message</div>
              <div style="background-color: #f0f7f0; border-radius: 8px; padding: 16px; border-left: 4px solid #238636; font-family: 'Segoe UI', system-ui, sans-serif; font-size: 15px; line-height: 1.6; color: #333333; white-space: pre-wrap;">${escapeHtml(data.message)}</div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 20px 40px; background-color: #f9f9f9; border-top: 1px solid #eeeeee;">
              <p style="margin: 0; font-family: 'Segoe UI', system-ui, sans-serif; font-size: 13px; color: #888888;">
                You’re receiving this because you submitted the contact form. We’ll reply to this thread if needed.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
