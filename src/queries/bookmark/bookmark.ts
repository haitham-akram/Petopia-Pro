import Bookmark from "../../database/schemas/bookmarkSchema";
import Post from "../../database/schemas/postSchema";

const bookmarkQuery = async (userId: string, postId: string) => {
    // Check if the postId already exists in the marked_posts array
    const bookmark = await Bookmark.findOne({ userId, "marked_posts.postId": postId });

    if (bookmark) {
        // If the postId exists, remove it
        await Bookmark.updateOne(
            { userId },
            { $pull: { marked_posts: { postId } } }
        );
        // Check the current bookmarkCount
        const post = await Post.findById(postId);
        if (post && post.bookmarkCount > 0) {
            await Post.updateOne({ _id: postId }, { $inc: { bookmarkCount: -1 } });
        }
        return false;
    } else {
        // If the postId does not exist, add it
        await Bookmark.updateOne(
            { userId },
            { $addToSet: { marked_posts: { postId } } },
            { upsert: true }
        );
        await Post.updateOne({ _id: postId }, { $inc: { bookmarkCount: +1 } });
        return true;
    }
};

export default bookmarkQuery;