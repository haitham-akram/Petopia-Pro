import { type Response, type NextFunction } from 'express'
import { type CustomRequest } from '../../interfaces/iUser'
import { bookmarkQuery } from '../../queries/bookmark'

const bookmark = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id as string
        const postId = req.body.postId
        const newBookmark = await bookmarkQuery(userId, postId)

        res.status(200).json({
            message: `Post ${newBookmark ? "marked" : "unmarked"} successfully`
        })
    } catch (error) {
        next(error)

    }
}
export default bookmark