// Post Model CRUD function depend on MongoDB connection and Mongoose schema

import addNewPost from "./addNewPost";
import addNewPostImage from "./addNewPostImage";
import callOnePostById from "./callOnePostById";
import callAllPostsByUserId from "./callAllPostsByUserId";
import callOnePostByUserId from "./callOnePostByUserId";

export {
  addNewPost,
  addNewPostImage,
  callOnePostById,
  callAllPostsByUserId,
  callOnePostByUserId,
};
