<<<<<<< HEAD
import express from "express";
import authRouter from "./auth";
import petRouter from "./pet";
import petTypeRouter from "./petType";
import followerRouter from "./follower";
import PostsRouter from "./User/posts";
import CommentsRouter from "./User/comments";
import LikeRouter from "./User/likes";
=======
import express from 'express'
import authRouter from './auth'
import petRouter from './pet'
import petTypeRouter from './petType'
import followerRouter from './follower'
import PostsRouter from './user/posts'
import CommentsRouter from './user/comments'
import BookmarkRouter from './bookmark'
>>>>>>> dfa761bc9a4c94c14367aa609db554a0f54ffaf1

const router = express.Router();

<<<<<<< HEAD
router.use("/auth", authRouter);
router.use("/pet", petRouter);
router.use("/pet-type", petTypeRouter);
router.use("/follower", followerRouter);
router.use("/posts", PostsRouter);
router.use("/comments", CommentsRouter);
router.use("/likes", LikeRouter);

export default router;
=======
router.use('/auth', authRouter)
router.use('/pet', petRouter)
router.use('/pet-type', petTypeRouter)
router.use('/follower', followerRouter)
// Posts Routes
router.use('/posts', PostsRouter)
// Comments Routes
router.use('/comments', CommentsRouter)
router.use('/bookmark', BookmarkRouter)
export default router
>>>>>>> dfa761bc9a4c94c14367aa609db554a0f54ffaf1
