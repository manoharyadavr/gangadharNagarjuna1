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
              <h3 style="color: #2d5a2d; margin-top: 0;">📅 Workshop Meeting Link:</h3>
              <p><strong>${latestMeetingLink.title}</strong></p>
              ${latestMeetingLink.description ? `<p style="color: #666;">${latestMeetingLink.description}</p>` : ''}
              <a href="${latestMeetingLink.link}" style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">
                Join Meeting
              </a>
            </div>
          ` : ''}
          
          <p style="color: #666; line-height: 1.6;">
            We're excited to have you join us! Please check your email regularly for updates and additional workshop materials.
          </p>
          
          <p style="color: #666; line-height: 1.6;">
            If you have any questions, please don't hesitate to contact us.
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 14px;">
              Best regards,<br>
              Gangadhar Nagarjuna Academy
            </p>
          </div>
        </div>
      </div>
    `;

    // If transporter is null (no credentials), just log the email
    if (!transporter) {
      console.log('📧 DEMO MODE - Email would be sent to:', email);
      console.log('📧 Subject: Payment Confirmed -', courseName);
      console.log('📧 Content preview:', emailContent.substring(0, 200) + '...');
      return { success: true, demo: true };
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Payment Confirmed - ${courseName}`,
      html: emailContent
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Confirmation email sent to ${email}`);
    
    return { success: true };
  } catch (error) {
    console.error('❌ Email sending error:', error);
    
    // Don't throw error, just log it and return success to not break payment flow
    console.log('📧 Email failed but payment verification will continue');
    return { success: false, error: error.message };
  }
};

export {
  sendConfirmationEmail
}; 