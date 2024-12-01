// Comment Model CRUD function depend on MongoDB connection and Mongoose schema

import addNewComment from "./addNewComment";
import callPostCommentsByPostId from "./callPostCommentsByPostId";
import callAllPostCommentsByUserId from "./callAllPostsCommentsByUserId";

export { addNewComment, callPostCommentsByPostId, callAllPostCommentsByUserId };