// Post Model CRUD function depend on MongoDB connection and Mongoose schema

import addNewPost from "./addNewPost";
import addNewPostImage from "./addNewPostImage";
import callPostById from "./callPostById";
import callAllPostsByUserId from "./callAllPostsByUserId";
import callOnePostByUserId from "./callOnePostByUserId";

export {
  addNewPost,
  addNewPostImage,
  callPostById,
  callAllPostsByUserId,
  callOnePostByUserId,
};
