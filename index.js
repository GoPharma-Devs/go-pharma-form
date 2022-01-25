
const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
const morgan = require('morgan');
require("dotenv").config();
const CLIENT_ID = process.env.CLIENT_ID_SECRET

const CLIENT_SECRET = process.env.CLIENT_SUPER_SECRET
const ACCESS_TOKEN = process.env.ACCESS_TOKEN_ENV
const log = console.log;
const port = 5000;
const app = express();

app.use(cors());
app.use(morgan(":method :url :status :response-time ms"));
app.use(express.json());
app.listen(port, () => log(`Server Running on port ${port}`));

log("-----------*---------------")
const saludar = log('Hola Go-pharma®')

const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'gopharmadev@gmail.com',
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: "1//04pPDtTOwDKKpCgYIARAAGAQSNwF-L9IrvctcechC_yxPArE63bu-PcuXaYC_fTN1jXNmQcIg_gxDxRQ8ZMufh0dVhG4Zkvze9Cc",
    accessToken: ACCESS_TOKEN,
  },
});

contactEmail.verify((error) => {
  if (error) {
    log(error);
  } else {
    log("🤖 Server Ready to Send ");
  }
});

//routes
app.get("/", (req, res) => { res.send(" <p>CRBZ</p>") });
app.get("/test", (req, res) => { res.send("test") });
//post
app.post("/contact", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const message = req.body.message;

  const mail = {
    from: "Go-Pharma®",
    to: "armandoboyzo@go-pharma.mx",
    subject: `Go Pharma - You've Got Mail`,
    html: `
    <h1>🚀 New Message</h1>
    
    <p><strong>${name}</strong> quiere contactar contigo y dejó los siguentes datos: </p>
    
    <ul>
      <li>Nombre: ${name}</li>
      <li>Email: ${email}</li>
      <li>Teléfono: ${phone}</li>
      <li>Mensaje: ${message}</li>
    </ul>
    `,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "failed" });
    } else {
      res.json({ status: "sent" })

    }
  });
});