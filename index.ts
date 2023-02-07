import express, { Express, Request, Response } from 'express'
import axios from 'axios'
import cors from 'cors'
import 'dotenv/config'
import nodemailer from 'nodemailer'
import mg from 'nodemailer-mailgun-transport'

const app: Express = express()
app.use(express.json())
app.use(cors({credentials: true, origin: process.env.CORS_ORIGIN}))
const port = process.env.PORT

const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  }
}
const nodemailerMailgun = nodemailer.createTransport(mg(auth))

// default route
app.get('/', (req: Request, res: Response) => {
  res.send('jsm-backend')
})

app.post('/sendemail', (req: Request, res: Response) => {
  nodemailerMailgun.sendMail({
    from: req.body.email,
    to: 'gavrilenko.georgi@gmail.com', // An array if you have multiple recipients.
    subject: 'JSM contact form message',
    'replyTo': req.body.email,
    html: `<p>${req.body.message}</p>`,
    text: req.body.message
  }, (err, info) => {
    if (err) {
      res.send(`Error: ${err.message}`)
    } else {
      res.send(`Response: ${info.messageId}`)
    }
  })
})

app.post('/captcha', (req: Request, res: Response) => {
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${req.body.token}`
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    }
  }

  axios.post(url, {}, config)
    .then((result) => {
      res.send(result.data)
    }).catch((err) => {
      console.error(err) //TODO: proper error handling
    })
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
