// Post Model CRUD function depend on MongoDB connection and Mongoose schema

import addNewPost from "./addNewPost";
// import addNewPostImage from "./addNewPostImage";
import callOnePostById from "./callOnePostById";
// import callAllPostsByUserId from "./callAllPostsByUserId";
import deletePostById from "./deletePostById";
import updatePostById from "./updatePostById";
import replacePostById from "./replacePostData";
import callPostOnPagenation from "./callPostOnPagenation";

export {
  addNewPost,
  // addNewPostImage,
  callOnePostById,
  // callAllPostsByUserId,
  deletePostById,
  updatePostById,
  replacePostById,
  callPostOnPagenation,
};
