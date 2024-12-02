import { type Request, type Response } from "express"

const logout = (_req:Request, res:Response) => {
    res.clearCookie('token').json({
        message: 'Logged Out Successfully.'
      })
}

export default logout