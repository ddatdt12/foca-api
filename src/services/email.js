const nodemailer = require('nodemailer');

const EmailService = {
	sendVerificationEmail: async (options) => {
		// 1) Create a transporter
		const transporter = nodemailer.createTransport({
			host: 'smtp-relay.sendinblue.com',
			port: 587,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		});

		// 2) Define the email options
		const mailOptions = {
			from: '"Foco Food Every Where" <ddatdt12@gmail.com>',
			to: options.email,
			subject: options.subject,
			text: `Account verification code: ${options.code}`,
			html: `<p>Account verification code: ${options.code}</p>`,
		};

		const res = await transporter.sendMail(mailOptions);
		console.log(res);
	},
};

module.exports = EmailService;
