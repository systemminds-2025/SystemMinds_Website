import nodemailer from 'nodemailer';

// SMTP Configuration
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_SECURE = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : SMTP_PORT === 465;
const SMTP_USER = process.env.SMTP_USER || 'info.systemminds@gmail.com';
const SMTP_PASS = process.env.SMTP_PASS || 'gtzrhicqwdpfbotn';
const DEFAULT_TO = process.env.SMTP_TO || 'info.systemminds@gmail.com';

// Create transporter
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

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
  // Use formatted chat message if userMessage is provided, otherwise use body
  const emailBody = userMessage ? formatChatMessage(userMessage, fromEmail, isEmailRegistration) : body;
  const emailSubject = subject || (isEmailRegistration ? 'New Email Registration from SystemMinds Website' : (userMessage ? 'New Message from SystemMinds Website' : 'SystemMinds website message'));

  // Validate and use fromEmail if provided and valid, otherwise use default
  const validFromEmail = fromEmail && isValidEmail(fromEmail) ? fromEmail : SMTP_USER;
  const replyToEmail = fromEmail && isValidEmail(fromEmail) ? fromEmail : (replyTo || undefined);

  // If user provided email, send FROM that email address
  // Note: The actual SMTP sending uses our credentials, but the email appears to come from user's email
  const mailOptions = {
    from: {
      name: fromName || (fromEmail && isValidEmail(fromEmail) ? 'Website Visitor' : 'SystemMinds Website'),
      address: validFromEmail, // Use user's email as from address if valid
    },
    to: to || DEFAULT_TO,
    subject: emailSubject,
    html: emailBody,
    replyTo: replyToEmail || validFromEmail, // Set replyTo to user's email if provided
  };

  const response = await transporter.sendMail(mailOptions);
  return response;
}
