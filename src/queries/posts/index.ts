// Post Model CRUD function depend on MongoDB connection and Mongoose schema

import addNewPost from "./addNewPost";
import callOnePostById from "./callOnePostById";
import deletePostById from "./deletePostById";
import replacePostById from "./replacePostData";
import callPostOnPagenation from "./callPostOnPagenation";
import callPostExistence from "./callPostExistence";
import callAllDataPost from "./callAllDataPost";

export {
  addNewPost, // used
  callOnePostById, // used
  deletePostById, // used
  replacePostById, // used
  callPostOnPagenation, // used
  callPostExistence, // used
  callAllDataPost, // used
};
