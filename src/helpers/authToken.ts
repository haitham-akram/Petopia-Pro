import jwt, { type Secret } from 'jsonwebtoken'
import { config } from 'dotenv'
import { UserPayload } from '../interfaces/iUser'

config()

const { SECRET_KEY } = process.env

const generateToken = async (payload: UserPayload) =>
    await new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET_KEY as Secret, { expiresIn: '1h' }, (err, token) => {
            if (err != null) reject(err)
            else resolve(token)
        })
    })

const verifyToken = async (token: string): Promise<UserPayload | undefined> =>
    await new Promise((resolve, reject) => {
        jwt.verify(token, SECRET_KEY as Secret, (err, decode) => {
            if (err != null) reject(err)
            else resolve(decode as UserPayload)
        })
    })


export { generateToken, verifyToken }

