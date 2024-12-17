import Bookmark from "../../database/schemas/bookmarkSchema";

const getBookmarksQuery = async (userId: string, page: number, limit: number) => {
    const bookmarks = await Bookmark.find({ userId })

        // .populate('marked_posts.postId')
        .skip(page * limit)
        .limit(limit)
        .populate({
            path: 'marked_posts.postId',
            model: 'Post'
        });
    return bookmarks;
}
export default getBookmarksQuery