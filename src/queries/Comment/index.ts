// Comment Model CRUD function depend on MongoDB connection and Mongoose schema

import addNewComment from "./addNewComment";
import callPostCommentsByPostId from "./callCommentsByPostId";
import callAllPostCommentsByUserId from "./callAllPostsCommentsByUserId";
import callCommentsByPostId from "./callCommentsByPostId";

export {
  addNewComment,
  callPostCommentsByPostId,
  callAllPostCommentsByUserId,
  callCommentsByPostId,
};
