const nodemailer = require('nodemailer');

const EmailService = {
	sendVerificationEmail: async (options) => {
		// 1) Create a transporter
		const transporter = nodemailer.createTransport({
			service: 'Mailgun',
			auth: {
				user: process.env.MAILGUN_USERNAME,
				pass: process.env.MAILGUN_PASSWORD,
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

		console.log('Options: ', mailOptions);
		// 3) Actually send the email
		const res = await transporter.sendMail(mailOptions);
		console.log(res);
	},
};

module.exports = EmailService;
