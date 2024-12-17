// Comment Model CRUD function depend on MongoDB connection and Mongoose schema

import addNewComment from "./addNewComment";
import callPostCommentsByPostId from "./callCommentsByPostId";
import callCommentsByPostId from "./callCommentsByPostId";
import deleteComment from "./deleteComment";
import updateComment from "./updateComment";

export {
  addNewComment,
  callPostCommentsByPostId,
  callCommentsByPostId,
  deleteComment,
  updateComment,
};
