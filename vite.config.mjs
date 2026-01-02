import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { sendMail } from './server/sendEmail.js';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'email-api',
      configureServer(server) {
        server.middlewares.use('/api/send-email', async (req, res) => {
          // CORS headers
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

          // Handle OPTIONS
          if (req.method === 'OPTIONS') {
            res.statusCode = 200;
            res.end();
            return;
          }

          // Only POST
          if (req.method !== 'POST') {
            res.statusCode = 405;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }));
            return;
          }

          // Read body
          let body = '';
          req.on('data', chunk => { body += chunk.toString(); });
          
          req.on('end', async () => {
            try {
              const data = JSON.parse(body || '{}');
              const { subject, body: emailBody, replyTo, fromName, to, userMessage, fromEmail, isEmailRegistration } = data;

              if (!emailBody && !userMessage) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ ok: false, error: 'Email body or user message is required.' }));
                return;
              }

              const response = await sendMail({ subject, body: emailBody, replyTo, fromName, to, userMessage, fromEmail, isEmailRegistration });
              
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: true, messageId: response.messageId }));
            } catch (error) {
              console.error('Failed to send email:', error);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: false, error: error.message || 'Email send failed.' }));
            }
          });
        });
      },
    },
  ],
});









