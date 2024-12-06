import CustomError from './CustomError'
import { type Request, type Response, type NextFunction, type ErrorRequestHandler } from 'express'

const serverError: ErrorRequestHandler = (
    err,
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    if (res.headersSent) {
        return next(err);
    }

    const { status, message, errors } = err

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            data: { errors }
        })
    }
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            message: 'Unauthorized'
        })

    }
    if (err instanceof CustomError) {
        if (status !== undefined) {
            return res.status(status).json({
                message
            })

        }
    }
    if (err.message?.includes('invalid input syntax for type integer')) {
        return res.status(400).json({
            message: 'Please Enter a valid id number'
        })

    }
    if (err.message?.includes('is out of range for type integer')) {
        return res.status(400).json({
            message: 'Please Enter a valid id number'
        })

    }

    if (err.original?.detail.includes('is not present in table')) {
        return res.status(400).json({
            message: "The post you are looking doesn't exist"
        })

    }

    if (err.message?.includes('violates foreign key constraint')) {
        return res.status(400).json({
            message: 'Bad Request, please try again later'
        })

    }

    return res.status(500).json({
        data: {
            message: err.message
        }
    })
}

export default serverError