const nodemailer = require('nodemailer');

// Create a transporter
// NOTE: Configure EMAIL_USER and EMAIL_PASS in .env to enable email notifications
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendOrderConfirmation = async (to, orderDetails) => {
  // Skip email if credentials are not configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('Email credentials not configured. Skipping email notification.');
    return;
  }

  const mailOptions = {
    from: `"ArtStore" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: 'Order Confirmation - ArtStore',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h1>Thank you for your order!</h1>
        <p>Hi ${orderDetails.buyerName},</p>
        <p>Your order has been placed successfully.</p>

        <h3>Order Details:</h3>
        <ul>
          <li><strong>Artwork:</strong> ${orderDetails.artworkTitle}</li>
          <li><strong>Price:</strong> Rs. ${orderDetails.amount}</li>
          <li><strong>Order ID:</strong> ${orderDetails.orderId}</li>
        </ul>

        <p>We will notify you when your item is shipped to:</p>
        <p>${orderDetails.shippingAddress}</p>

        <p>Best regards,<br>The ArtStore Team</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent to:', to);
  } catch (error) {
    console.error('Error sending email:', error.message);
    // Don't throw error - email is optional, order should still succeed
  }
};

module.exports = { sendOrderConfirmation };
