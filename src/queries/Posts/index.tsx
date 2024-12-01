// Post Model CRUD function depend on MongoDB connection and Mongoose schema

import addNewPost from './addNewPost'
import callPostById from './callPostById'
import callAllPostsByUserId from './callAllPostsByUserId'
import callOnePostByUserId from './callOnePostByUserId'


export { addNewPost, callPostById, callAllPostsByUserId, callOnePostByUserId };