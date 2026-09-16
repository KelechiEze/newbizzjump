import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';

function getDatabase() {
  if (!getApps().length) {
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

    if (!serviceAccount) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON is not configured');
    }

    initializeApp({ credential: cert(JSON.parse(serviceAccount)) });
  }

  return getFirestore();
}

function response(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(body),
  };
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return response(204, {});
  }

  if (event.httpMethod !== 'POST') {
    return response(405, { success: false, message: 'Method not allowed.' });
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const normalizedName = String(body.name || `${body.firstName || ''} ${body.lastName || ''}`).trim();
    const email = String(body.email || '').trim().toLowerCase();
    const message = String(body.message || '').trim();

    if (!normalizedName || !email) {
      return response(400, { success: false, message: 'Name and email are required.' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return response(400, { success: false, message: 'Please enter a valid email address.' });
    }

    if (normalizedName.length > 160 || message.length > 10000) {
      return response(400, { success: false, message: 'Some fields are too long.' });
    }

    const nameParts = normalizedName.split(/\s+/);
    const doc = await getDatabase().collection('contactSubmissions').add({
      name: normalizedName,
      firstName: nameParts[0],
      lastName: nameParts.slice(1).join(' '),
      phoneNumber: String(body.phoneNumber || '').trim(),
      email,
      message,
      company: String(body.company || '').trim(),
      services: Array.isArray(body.services) ? body.services.map(String).slice(0, 20) : [],
      budget: String(body.budget || '').trim(),
      timeline: String(body.timeline || '').trim(),
      status: 'unread',
      emailsSent: false,
      createdAt: FieldValue.serverTimestamp(),
      submittedAt: new Date().toISOString(),
      source: 'bizzjump-netlify',
    });

    return response(200, {
      success: true,
      message: 'Form submitted successfully!',
      submissionId: doc.id,
    });
  } catch (error) {
    console.error('Contact submission failed:', error.message);
    return response(500, {
      success: false,
      message: error.message.includes('FIREBASE_SERVICE_ACCOUNT_JSON')
        ? 'The live contact service is not configured yet.'
        : 'We could not save your submission. Please try again.',
    });
  }
}