import express from "express";
import authRouter from "./auth";
import petRouter from "./pet";
import petTypeRouter from "./petType";
import followerRouter from "./follower";
import PostsRouter from "./User/posts";
import CommentsRouter from "./User/comments";
import LikeRouter from "./User/likes";
import BookmarkRouter from "./bookmark";
import CategoryRouter from "./category";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/pet", petRouter);
router.use("/pet-type", petTypeRouter);
router.use("/follower", followerRouter);
router.use("/posts", PostsRouter);
router.use("/comments", CommentsRouter);
router.use("/likes", LikeRouter);
router.use("/bookmark", BookmarkRouter);
router.use("/categories", CategoryRouter);
export default router;
