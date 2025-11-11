import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import { defineSecret } from 'firebase-functions/params';

// Define your secrets (alternative to functions.config())
const gmailEmail = defineSecret('GMAIL_EMAIL');
const gmailPassword = defineSecret('GMAIL_PASSWORD');

admin.initializeApp();

interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  emailSent?: boolean;
  processedAt?: admin.firestore.Timestamp | admin.firestore.FieldValue;
  emailError?: string;
}

export const onContactFormSubmit = onDocumentCreated(
  {
    document: 'contactSubmissions/{submissionId}',
    secrets: [gmailEmail, gmailPassword],
  },
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
      console.log('No data associated with the event');
      return;
    }

    const submissionData = snapshot.data() as ContactSubmission;

    // Configure Nodemailer with secrets
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailEmail.value(),
        pass: gmailPassword.value(),
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact" <${gmailEmail.value()}>`,
      to: 'mobisakwamboka@gmail.com',
      subject: `New Contact Form Submission: ${submissionData.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${submissionData.name}</p>
        <p><strong>Email:</strong> ${submissionData.email}</p>
        <p><strong>Phone:</strong> ${submissionData.phone}</p>
        <p><strong>Subject:</strong> ${submissionData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${submissionData.message}</p>
        <p>Received at: ${new Date(submissionData.createdAt).toLocaleString()}</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');

      await snapshot.ref.update({
        emailSent: true,
        processedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error('Error sending email:', error);
      await snapshot.ref.update({
        emailError: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }
);