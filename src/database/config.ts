import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const { NODE_ENV, DEV_DB_URL, PROD_DB_URL, TEST_DB } = process.env

let url: string

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: process.env.NODE_ENV === 'production'
};
switch (NODE_ENV) {
    case 'production':
        url = PROD_DB_URL as string
        break
    case 'development':
        url = DEV_DB_URL as string
        break
    case 'test':
        url = TEST_DB as string
        break
    default:
        throw new Error('NODE_ENV is not set')
}

const connection = mongoose.connect(url, options)

export default connection