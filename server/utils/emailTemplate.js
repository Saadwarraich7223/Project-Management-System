export function generateForgotPasswordEmailTemplate(resetPasswordUrl) {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">

    <!-- Header -->
    <div style="text-align: center; margin-bottom: 20px;">
      <h2 style="color: #3b82f6; margin: 0;">🔐Fyp Management System - Reset Your Password</h2>
      <p style="font-size: 14px; color: #6b7280; margin: 5px 0 0;">
        Secure access to your account
      </p>
    </div>

    <!-- Body -->
    <p style="font-size: 16px; color: #374151;">Dear User,</p>

    <p style="font-size: 16px; color: #374151;">
      We received a request to reset your password. Please click the button below to set up a new one.
    </p>

    <!-- Button -->
    <div style="text-align: center; margin: 30px 0;">
      <a href="${resetPasswordUrl}"
        style="
          display: inline-block;
          font-size: 16px;
          font-weight: bold;
          color: #ffffff;
          background-color: #3b82f6;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 6px;
        ">
        Reset Password
      </a>
    </div>

    <p style="font-size: 15px; color: #374151;">
      If you did not request this, you can safely ignore this email.
      This link will expire in <b>10 minutes</b>.
    </p>

    <!-- Link -->
    <p style="font-size: 14px; color: #3b82f6; word-wrap: break-word;">
      ${resetPasswordUrl}
    </p>

    <!-- Footer -->
    <footer style="margin-top: 30px; text-align: center;">
      <p style="font-size: 14px; color: #6b7280;">
        Thank you,<br/>
        <strong>FYP Management System Team</strong>
      </p>
      <p style="font-size: 12px; color: #9ca3af;">
        This is an automated message. Please do not reply.
      </p>
    </footer>

  </div>
  `;
}

//accept request

export const generateRequestAcceptTemplate = (teacherName) => {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
    <h2 style="color: #2e7d32;">Request Accepted</h2>

    <p>Hello,</p>

    <p>
      Your supervisor request has been <strong>approved</strong> by 
      <strong>${teacherName}</strong>.
    </p>

    <p>Please log in to your dashboard to continue your FYP process.</p>

    <p style="font-size: 12px; color: gray;">
      FYP Management System — Automated Email
    </p>
  </div>
  `;
};

//reject request

export const generateRequestRejectTemplate = (teacherName) => {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
    <h2 style="color: #c62828;">Request Rejected</h2>

    <p>Hello,</p>

    <p>
      Your supervisor request to <strong>${teacherName}</strong> has been 
      <strong>rejected</strong>.
    </p>

    <p>You may submit a new request from your dashboard.</p>

    <p style="font-size: 12px; color: gray;">
      FYP Management System — Automated Email
    </p>
  </div>
  `;
};
