import Flag from "../../database/schemas/flagSchema";

const getFlagsQuery = async (page: number, limit: number) => {
    const skip = page * limit;

    const flags = await Flag.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "ownerId",
                foreignField: "_id",
                as: "flagOwner"
            }
        },
        { $unwind: { path: "$flagOwner", preserveNullAndEmptyArrays: true } },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user"
            }
        },
        { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
        {
            $lookup: {
                from: "posts",
                localField: "postId",
                foreignField: "_id",
                as: "post"
            }
        },
        { $unwind: { path: "$post", preserveNullAndEmptyArrays: true } },
        {
            $lookup: {
                from: "comments",
                localField: "commentId",
                foreignField: "_id",
                as: "comment"
            }
        },
        { $unwind: { path: "$comment", preserveNullAndEmptyArrays: true } },
        {
            $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "product"
            }
        },
        { $unwind: { path: "$product", preserveNullAndEmptyArrays: true } },
        {
            $lookup: {
                from: "categories",
                localField: "post.categoryId",
                foreignField: "_id",
                as: "postCategory"
            }
        },
        { $unwind: { path: "$postCategory", preserveNullAndEmptyArrays: true } },
        {
            $project: {
                flagOwner: { _id: 1, fullName: 1, email: 1 },
                user: { _id: 1, fullName: 1, email: 1 },
                post: { _id: 1, title: 1, postContent: 1, categoryTitle: "$postCategory.title" },
                comment: { _id: 1, commentText: 1 },
                product: { _id: 1, title: 1, price: 1, details: 1 },
                createdAt: 1,
                updatedAt: 1
            }
        },
        {
            $skip: skip
        },
        {
            $limit: limit
        }
    ]);

    return flags;
};

export default getFlagsQuery;