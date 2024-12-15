// Comment Model CRUD function depend on MongoDB connection and Mongoose schema

import addNewComment from "./addNewComment";
import callPostCommentsByPostId from "./callCommentsByPostId";
import callCommentsByPostId from "./callCommentsByPostId";
import deleteComment from "./deleteComment";

export {
  addNewComment,
  callPostCommentsByPostId,
  callCommentsByPostId,
  deleteComment,
};
