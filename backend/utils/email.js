import nodemailer from 'nodemailer';
import MeetingLink from '../models/MeetingLink.js';

// Create transporter with fallback for missing credentials
const createTransporter = () => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  // If credentials are missing, return null (will use demo mode)
  if (!emailUser || !emailPass) {
    console.log('Email credentials not configured. Emails will be logged instead of sent.');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail', // or your email service
    auth: {
      user: emailUser,
      pass: emailPass
    }
  });
};

const sendConfirmationEmail = async ({ email, name, courseName, coursePrice, registrationId }) => {
  try {
    const transporter = createTransporter();

    // Get active meeting links
    const meetingLinks = await MeetingLink.find({ isActive: true }).sort({ createdAt: -1 });
    const latestMeetingLink = meetingLinks[0];

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <h1 style="color: #333; margin: 0;">🎉 Payment Confirmed!</h1>
        </div>
        
        <div style="padding: 30px; background-color: white;">
          <h2 style="color: #333;">Hello ${name},</h2>
          
          <p style="color: #666; line-height: 1.6;">
            Thank you for your payment! Your registration for <strong>${courseName}</strong> has been confirmed.
          </p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Registration Details:</h3>
            <p><strong>Course:</strong> ${courseName}</p>
            <p><strong>Amount Paid:</strong> ₹${coursePrice}</p>
            <p><strong>Registration ID:</strong> ${registrationId}</p>
          </div>
          
          ${latestMeetingLink ? `
          <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2d5a2d; margin-top: 0;">📅 Meeting Link:</h3>
            <p><strong>Date:</strong> ${new Date(latestMeetingLink.date).toLocaleDateString('en-IN')}</p>
            <p><strong>Time:</strong> ${latestMeetingLink.time}</p>
            <p><strong>Link:</strong> <a href="${latestMeetingLink.link}" style="color: #007bff;">${latestMeetingLink.link}</a></p>
          </div>
          ` : ''}
          
          <p style="color: #666; line-height: 1.6;">
            We're excited to have you join us! If you have any questions, please don't hesitate to reach out.
          </p>
          
          <p style="color: #666; line-height: 1.6;">
            Best regards,<br>
            <strong>Gangadhar Nagarjuna</strong><br>
            Business Academy
          </p>
        </div>
      </div>
    `;

    if (transporter) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Payment Confirmed - ${courseName}`,
        html: emailContent
      });
      console.log('✅ Confirmation email sent successfully to:', email);
    } else {
      console.log('📧 Demo mode - Email would be sent to:', email);
      console.log('📧 Email content:', emailContent);
    }
    
    return { success: true };
  } catch (error) {
    console.error('❌ Email sending error:', error);
    
    // Don't throw error, just log it and return success to not break payment flow
    console.log('📧 Email failed but payment verification will continue');
    return { success: false, error: error.message };
  }
};

const sendPasswordResetEmail = async ({ email, resetToken, resetUrl }) => {
  try {
    const transporter = createTransporter();

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <h1 style="color: #333; margin: 0;">🔐 Password Reset Request</h1>
        </div>
        
        <div style="padding: 30px; background-color: white;">
          <h2 style="color: #333;">Hello,</h2>
          
          <p style="color: #666; line-height: 1.6;">
            You requested a password reset for your admin account. Click the button below to reset your password:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6;">
            If the button doesn't work, copy and paste this link into your browser:
          </p>
          <p style="color: #007bff; word-break: break-all;">
            ${resetUrl}
          </p>
          
          <p style="color: #666; line-height: 1.6;">
            This link will expire in 10 minutes for security reasons.
          </p>
          
          <p style="color: #666; line-height: 1.6;">
            If you didn't request this password reset, please ignore this email.
          </p>
          
          <p style="color: #666; line-height: 1.6;">
            Best regards,<br>
            <strong>Gangadhar Nagarjuna</strong><br>
            Business Academy
          </p>
        </div>
      </div>
    `;

    if (transporter) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request - Admin Panel',
        html: emailContent
      });
      console.log('✅ Password reset email sent successfully to:', email);
    } else {
      console.log('📧 Demo mode - Password reset email would be sent to:', email);
      console.log('📧 Reset URL:', resetUrl);
    }
    
    return { success: true };
  } catch (error) {
    console.error('❌ Password reset email sending error:', error);
    return { success: false, error: error.message };
  }
};

export {
  sendConfirmationEmail,
  sendPasswordResetEmail
}; 