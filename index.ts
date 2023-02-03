import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import axios from 'axios'
import cors from 'cors'

dotenv.config()

const app: Express = express()
app.use(express.json())
app.use(cors({credentials: true, origin: process.env.CORS_ORIGIN}))
const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.post('/sendmail', (req: Request, res: Response) => {
  res.send('Sending email...')
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
