const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config();

const app = express();
app.use((req, res, next) => {
  req._startTime = Date.now();
  next();
});

// ================= CORS =================
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'https://bizzjump.com,https://www.bizzjump.com,http://localhost:3000,http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

// ================= FIREBASE =================
function getFirebaseCredential() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    return admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON));
  }

  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return admin.credential.applicationDefault();
  }

  const configuredPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || 'new-service-account.json';
  const serviceAccountPath = path.isAbsolute(configuredPath)
    ? configuredPath
    : path.join(__dirname, configuredPath);
  return admin.credential.cert(require(serviceAccountPath));
}

admin.initializeApp({
  credential: getFirebaseCredential()
});

const db = admin.firestore();

// ================= MULTIPLE EMAIL TRANSPORTERS =================
console.log('\n' + '='.repeat(70));
console.log('📧 SETTING UP EMAIL TRANSPORTERS');
console.log('='.repeat(70));

// SendGrid Transporter (if configured)
let sendgridTransporter = null;
if (process.env.SENDGRID_API_KEY) {
  sendgridTransporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 2525,
    secure: false,
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY
    },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 10000, // 10 second timeout
    greetingTimeout: 10000
  });
  console.log('✅ SendGrid configured');
}

// Gmail Transporter (Backup)
let gmailTransporter = null;
if (process.env.EMAIL_USER && process.env.EMAIL_APP_PASSWORD) {
  const cleanPassword = process.env.EMAIL_APP_PASSWORD.replace(/\s/g, '');
  gmailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: cleanPassword
    }
  });
  console.log(`✅ Gmail configured: ${process.env.EMAIL_USER}`);
}

console.log(`📧 Admin Emails: ${process.env.ADMIN_EMAILS}`);
console.log('='.repeat(70) + '\n');

// ================= HEALTH CHECK =================
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    services: { email: Boolean(sendgridTransporter || gmailTransporter), firebase: true },
  });
});

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'BIZZJUMP Backend Running 🚀',
    endpoints: { health: '/health', contact: '/api/contact' }
  });
});

// ================= ASYNC EMAIL SEND FUNCTION (NON-BLOCKING) =================
async function sendEmailsInBackground(formData, docId) {
  const { firstName, lastName, phoneNumber, email, message } = formData;
  const adminEmails = process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(',') : ['kelechieze400@gmail.com'];
  
  console.log(`\n📧 [BACKGROUND] Sending emails for submission: ${docId}`);
  
  // Email templates
  const adminHTML = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"><title>New BIZZJUMP Contact Message</title></head>
    <body style="font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h2>📬 New BIZZJUMP Contact Message</h2>
        </div>
        <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Phone:</strong> ${phoneNumber}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong><br/>${message || 'No message'}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          <hr>
          <a href="mailto:${email}" style="background: #0d9488; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Reply →</a>
        </div>
      </div>
    </body>
    </html>
  `;

  const userHTML = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"><title>Thank You</title></head>
    <body style="font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h2>Thank You for Contacting BIZZJUMP! 🙌</h2>
        </div>
        <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
          <p>Dear ${firstName} ${lastName},</p>
          <p>We received your message and will get back to you within 24 hours.</p>
          <h3>Your Message:</h3>
          <p>${message || 'No message provided'}</p>
          <br/>
          <p>Best regards,<br/>The BIZZJUMP Team</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Try to send admin emails
  let adminSent = false;
  for (const adminEmail of adminEmails) {
    try {
      if (sendgridTransporter) {
        await sendgridTransporter.sendMail({
          from: `"BIZZJUMP Contact" <${process.env.EMAIL_USER}>`,
          to: adminEmail,
          subject: `🔔 New BIZZJUMP Contact: ${firstName} ${lastName}`,
          html: adminHTML,
          replyTo: email
        });
        console.log(`✅ [BACKGROUND] Admin email sent to ${adminEmail} via SendGrid`);
        adminSent = true;
      } else if (gmailTransporter) {
        await gmailTransporter.sendMail({
          from: `"BIZZJUMP Contact" <${process.env.EMAIL_USER}>`,
          to: adminEmail,
          subject: `🔔 New BIZZJUMP Contact: ${firstName} ${lastName}`,
          html: adminHTML,
          replyTo: email
        });
        console.log(`✅ [BACKGROUND] Admin email sent to ${adminEmail} via Gmail`);
        adminSent = true;
      }
    } catch (error) {
      console.error(`❌ [BACKGROUND] Failed to send to ${adminEmail}:`, error.message);
    }
  }

  // Try to send auto-reply to user
  try {
    if (sendgridTransporter) {
      await sendgridTransporter.sendMail({
        from: `"BIZZJUMP Team" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Thank You for Contacting BIZZJUMP",
        html: userHTML
      });
      console.log(`✅ [BACKGROUND] Auto-reply sent to ${email} via SendGrid`);
    } else if (gmailTransporter) {
      await gmailTransporter.sendMail({
        from: `"BIZZJUMP Team" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Thank You for Contacting BIZZJUMP",
        html: userHTML
      });
      console.log(`✅ [BACKGROUND] Auto-reply sent to ${email} via Gmail`);
    }
  } catch (error) {
    console.error(`❌ [BACKGROUND] Auto-reply failed:`, error.message);
  }

  // Update Firestore with email status
  try {
    await db.collection('contactSubmissions').doc(docId).update({
      emailsSent: adminSent,
      emailSentAt: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log(`✅ [BACKGROUND] Firestore updated with email status`);
  } catch (error) {
    console.error(`❌ [BACKGROUND] Firestore update failed:`, error.message);
  }
  
  console.log(`📧 [BACKGROUND] Email process completed for ${docId}\n`);
}

// ================= CONTACT FORM - INSTANT RESPONSE =================
app.post('/api/contact', async (req, res) => {
  console.log('\n' + '📝'.repeat(35));
  console.log('NEW CONTACT FORM SUBMISSION');
  console.log('📝'.repeat(35));
  
  try {
    const {
      name,
      firstName,
      lastName,
      phoneNumber,
      email,
      message,
      company,
      services,
      budget,
      timeline,
    } = req.body;
    const normalizedName = String(name || `${firstName || ''} ${lastName || ''}`).trim();
    const normalizedEmail = String(email || '').trim().toLowerCase();
    const normalizedMessage = String(message || '').trim();
    
    console.log(`Name: ${normalizedName}`);
    console.log(`Email: ${normalizedEmail}`);
    console.log(`Phone: ${phoneNumber}`);

    // Quick validation
    if (!normalizedName || !normalizedEmail) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.'
      });
    }

    if (normalizedName.length > 160 || normalizedMessage.length > 10000) {
      return res.status(400).json({ success: false, message: 'Some fields are too long.' });
    }

    const nameParts = normalizedName.split(/\s+/);

    // Save to Firestore FIRST (fast operation)
    const formData = {
      name: normalizedName,
      firstName: nameParts[0],
      lastName: nameParts.slice(1).join(' '),
      phoneNumber: String(phoneNumber || '').trim(),
      email: normalizedEmail,
      message: normalizedMessage,
      company: String(company || '').trim(),
      services: Array.isArray(services) ? services.map(String).slice(0, 20) : [],
      budget: String(budget || '').trim(),
      timeline: String(timeline || '').trim(),
      status: 'unread',
      emailsSent: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      submittedAt: new Date().toISOString()
    };

    const docRef = await db.collection('contactSubmissions').add(formData);
    console.log(`✅ Saved to Firestore: ${docRef.id}`);

    // IMMEDIATELY RESPOND TO USER (don't wait for emails)
    res.json({
      success: true,
      message: 'Form submitted successfully!',
      submissionId: docRef.id
    });

    // NOW send emails in the BACKGROUND (user already got response)
    // Don't await - let it run asynchronously
    sendEmailsInBackground({
      firstName: nameParts[0],
      lastName: nameParts.slice(1).join(' '),
      phoneNumber,
      email: normalizedEmail,
      message: normalizedMessage,
    }, docRef.id);
    
    console.log(`✅ Response sent to user (${Date.now() - req._startTime}ms) - emails sending in background`);
    
  } catch (error) {
    console.error('❌ FATAL ERROR:', error);
    const isFirebaseAuthError = error.code === 16 || error.code === 'app/invalid-credential';
    res.status(500).json({
      success: false,
      message: isFirebaseAuthError
        ? 'Firebase authentication failed. Please check the backend service-account credentials.'
        : 'We could not save your submission. Please try again.'
    });
  }
});

// ================= VIEW SUBMISSIONS =================
app.get('/api/contact/submissions', async (req, res) => {
  try {
    const snapshot = await db.collection('contactSubmissions')
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get();
    
    const submissions = [];
    snapshot.forEach(doc => {
      submissions.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      });
    });
    
    res.json({ success: true, submissions });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('\n' + '='.repeat(70));
  console.log(`🚀 BIZZJUMP BACKEND RUNNING`);
  console.log('='.repeat(70));
  console.log(`📡 Port: ${PORT}`);
  console.log(`📧 Email: ${process.env.EMAIL_USER}`);
  console.log(`👥 Admins: ${process.env.ADMIN_EMAILS}`);
  console.log(`\n⚡ INSTANT RESPONSE MODE ENABLED`);
  console.log(`   - User gets response immediately`);
  console.log(`   - Emails send in background`);
  console.log(`   - Modal shows in < 1 second`);
  console.log('='.repeat(70) + '\n');
});