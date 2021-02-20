const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `
    <div>
      <h2>Your Recent Order for ${total}</h2>
      <p>Please start waljing over, we will have your order ready in the next 20 mins.</p>
      <ul>
        ${order
          .map((item) => `<li>
            <img src="${item.thumbnail}" alt="${item.name}"/>
            ${item.size} ${item.name} - ${item.price}
            </li>`
          ).join('')}
      </ul>
      <p>Your total is <strong>CRC${total}</strong> due at pickup</p>
      <style>
          ul {
            list-style: none;
          }
      </style>
    </div>
  `;
}

// Create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
  }
});

function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  })
} 


exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  // Check if they have filled out the honeypot
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Boop beep bop good bye' })
    }
  }
  
  // Validate the data coming in is correct
  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          message: `Oops! You are missing the ${field} field`
        })
      }
    }
  }

  // Make sure they actually have item in that order
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({ 
        message: `You order nothing?`
      })
    }
  }
  // Sent the email

  // Send the success or error message

  // Test send an email
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: "New Order!",
    html: generateOrderEmail({ order: body.order, total: body.total })
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' })
  }
}