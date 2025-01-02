import Flag from "../../database/schemas/flagSchema";
import Post from "../../database/schemas/postSchema";
/**
 * 
 * @param year 
 * @param month 
 * @param week 
 * @returns postStatistics
 * 
 * Number of total posts.
 * posts with most likes.
 * posts with most comments.
 * post with most bookmarks.
 * Number of posts based on products.
 * Number of posts based on pets.
 * Number of posts that has category normal or discuss or help (other)
 * Number of flagged posts so far
 * note :in mostLiked and etc we need to put range from max to max -3
 */
const getPostStatisticsQuery = async (year: number, month?: number, week?: number) => {
    const match: any = {
        $expr: {
            $and: [
                { $eq: [{ $year: "$createdAt" }, year] }
            ]
        }
    }
    month ? match.$expr.$and.push({ $eq: [{ month: "$createdAt" }, month] }) : null
    week ? match.$expr.$and.push({ $eq: [{ week: "$createdAt" }, week] }) : null
    const posts = await Post.find(match);
    const flaggedPosts = (await Flag.find(match)).filter((flag) => flag.postId).length

    return {
        total: posts.length,
        mostLiked: posts.filter((post) => {
            const max = Math.max(...posts.map((post) => post.likesCount));
            return [max, max - 1, max - 2].includes(post.likesCount)
        }

        ).map((post) => { return { content: post.postContent, likes: post.likesCount } }),
        mostCommented: posts.filter((post) => {
            const max = Math.max(...posts.map((post) => post.commentsCount));
            return [max, max - 1, max - 2].includes(post.commentsCount)
        }

        ).map((post) => { return { content: post.postContent, comments: post.commentsCount } }),
        mostBookmarked: posts.filter((post) => {
            const max = Math.max(...posts.map((post) => post.bookmarkCount));
            return [max, max - 1, max - 2].includes(post.bookmarkCount)
        }
        ).map((post) => { return { content: post.postContent, bookmarks: post.bookmarkCount } }),
        productPosts: posts.filter((post) => post.categoryId === 3).length,
        petPosts: posts.filter((post) => [1, 2].includes(post.categoryId)).length,
        otherPosts: posts.filter((post) => post.categoryId === 0).length,
        flaggedPosts
    };
}
export default getPostStatisticsQuery