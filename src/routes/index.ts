import express from "express";
import authRouter from "./auth";
import petRouter from "./pet";
import petTypeRouter from "./petType";
import followerRouter from "./follower";
import PostsRouter from "./user/posts";
import CommentsRouter from "./user/comments";
import LikeRouter from "./user/likes";
import BookmarkRouter from "./bookmark";
import CategoryRouter from "./category";
import ProductRouter from "./user/products";

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
router.use("/products", ProductRouter);
export default router;
