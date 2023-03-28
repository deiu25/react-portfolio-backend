const router = require("express").Router();
const nodemailer = require("nodemailer");

router.post("/contact", (req, res) => {
  let data = req.body;

  if (
    data.name.length === 0 ||
    data.email.length === 0 ||
    data.message.length === 0
  ) {
    return res.status(400).json({ msg: "Please Fill All The Fields!" });
  }

  let smtpTransporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    auth: {
      user: "d3iu25@gmail.com",
      pass: "ujwzjzsmtohtoxgc",
    },
  });

  let mailOptions = {
    from: data.email,
    to: "d3iu25@gmail.com",
    subject: `Message from ${data.name}`,
    html: `
      <h3>Informations<h3/>
      <ul>
        <li>Name: ${data.name}</li>
        <li>Email: ${data.email}</li>
      </ul>
      <h3>Message</h3>
      <p>${data.message}</p>
    `,
  };

  smtpTransporter.sendMail(mailOptions, (error) => {
    try {
      if (error) {
        return res
          .status(500)
          .json({ msg: "There was an error sending the email." });
      } else {
        return res.status(200).json({ msg: "Thank you for contacting me." });
      }
    } catch (error) {
      return res.status(500).json({ msg: "There was a server error." });
    }
  });
});

module.exports = router;
