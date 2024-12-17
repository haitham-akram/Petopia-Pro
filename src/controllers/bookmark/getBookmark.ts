import { type Response, type NextFunction } from 'express'
import { type CustomRequest } from '../../interfaces/iUser'
import { getBookmarksQuery } from '../../queries/bookmark'

const getBookmarks = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id as string
        const { page, limit } = req.query
        const numberPage = Number(page) >= 0 ? Number(page) : 0
        const numberLimit = Number(limit) >= 0 ? Number(limit) : 10
        const bookmarks = await getBookmarksQuery(userId, numberPage, numberLimit)
        res.status(200).json({
            message: "Bookmarks fetched successfully",
            data: bookmarks
        })
    } catch (error) {
        next(error)
    }
}
export default getBookmarks