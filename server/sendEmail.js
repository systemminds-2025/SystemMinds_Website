import { SendMailClient } from "zeptomail";

// ZeptoMail Configuration
const url = process.env.ZEPTOMAIL_URL || "https://api.zeptomail.in/v1.1/email";
const token = process.env.ZEPTOMAIL_TOKEN || "Zoho-enczapikey PHtE6r0OQ7zqizMm90IA7PS6RcOtYIl/qetgeVNE5t0XDvEKS01Xr48omzC2/U0pVqRDHf+byIprteybsb/RdD7kMT1KVWqyqK3sx/VYSPOZsbq6x00csF0bf03aU4Xvctdv0i3QvNfaNA==";
const DEFAULT_FROM_ADDRESS = "noreply@systemmindz.com";
const DEFAULT_FROM_NAME = "SystemMinds Website";
const DEFAULT_TO_EMAIL = "info.systemminds@gmail.com";
const DEFAULT_TO_NAME = "SystemMinds Team";

// Create ZeptoMail client
const client = new SendMailClient({ url, token });

// Format email body for chat messages
function formatChatMessage(userMessage, userEmail = null, isEmailRegistration = false) {
  if (isEmailRegistration) {
    return `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
          New Email Registration from SystemMinds Website
        </h2>
        <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-radius: 8px;">
          <p style="font-size: 16px; line-height: 1.6; color: #111827;">
            <strong>User Email:</strong><br/>
            ${userMessage.replace(/\n/g, '<br/>')}
          </p>
        </div>
        <div style="margin-top: 20px; padding: 15px; background-color: #f3f4f6; border-radius: 8px; font-size: 14px; color: #6b7280;">
          <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Source:</strong> SystemMinds Website Chat</p>
          <p><strong>Status:</strong> User has registered their email and is ready to send messages.</p>
        </div>
      </div>
    `;
  }

  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
        New Message from SystemMinds Website
      </h2>
      <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-radius: 8px;">
        <p style="font-size: 16px; line-height: 1.6; color: #111827;">
          <strong>User Message:</strong><br/>
          ${userMessage.replace(/\n/g, '<br/>')}
        </p>
      </div>
      <div style="margin-top: 20px; padding: 15px; background-color: #f3f4f6; border-radius: 8px; font-size: 14px; color: #6b7280;">
        ${userEmail ? `<p><strong>User Email:</strong> ${userEmail}</p>` : ''}
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Source:</strong> SystemMinds Website Chat</p>
      </div>
    </div>
  `;
}

// Email validation function
function isValidEmail(email) {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Main sendMail function
export async function sendMail({ subject, body, replyTo, fromName, to, userMessage, fromEmail, isEmailRegistration = false }) {
  console.log(`[Email] Preparing to send via ZeptoMail: ${subject || 'New Message'}`);

  try {
    // Use formatted chat message if userMessage is provided, otherwise use body
    const emailBody = userMessage ? formatChatMessage(userMessage, fromEmail, isEmailRegistration) : body;
    const emailSubject = subject || (isEmailRegistration ? 'New Email Registration from SystemMinds Website' : (userMessage ? 'New Message from SystemMinds Website' : 'SystemMinds website message'));

    const toAddress = to || DEFAULT_TO_EMAIL;
    const toName = (to === DEFAULT_TO_EMAIL || !to) ? DEFAULT_TO_NAME : (to.split('@')[0]);

    // ZeptoMail payload structure
    const mailOptions = {
      "from": {
        "address": DEFAULT_FROM_ADDRESS,
        "name": fromName || DEFAULT_FROM_NAME
      },
      "to": [
        {
          "email_address": {
            "address": toAddress,
            "name": toName
          }
        }
      ],
      "subject": emailSubject,
      "htmlbody": emailBody
    };

    // Add reply_to if provided
    if (replyTo || (fromEmail && isValidEmail(fromEmail))) {
      mailOptions.reply_to = [
        {
          "address": replyTo || fromEmail,
          "name": fromName || (fromEmail ? fromEmail.split('@')[0] : "Visitor")
        }
      ];
    }

    const response = await client.sendMail(mailOptions);
    console.log('[Email] ZeptoMail response:', response);

    return { ok: true, data: response };
  } catch (error) {
    console.error('[Email] ZeptoMail error:', error);
    return { ok: false, error: error.message };
  }
}
