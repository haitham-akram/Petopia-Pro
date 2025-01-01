import express from "express"
import compression from 'compression'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import router from './routes'
import serverError from './helpers/serverErrors'
import cors from 'cors'
import passport from "./controllers/auth/passport";

dotenv.config()
const { PORT, SECRET_KEY } = process.env
const app = express()

app.disable('x-powered-by')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(compression())
app.use(cookieParser())
app.use(cors())


// Initialize Passport
app.use(passport.initialize());

app.use('/api/v1', router)
app.set('port', PORT ?? 3000)

app.use(serverError)

export default app
