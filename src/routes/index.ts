import express from "express";
import authRouter from "./auth";
import petRouter from "./pet";
import petTypeRouter from "./petType";
import followerRouter from "./follower";
import PostsRouter from "./posts";
import CommentsRouter from "./comments";
import LikeRouter from "./likes";
import BookmarkRouter from "./bookmark";
import CategoryRouter from "./category";
import NotificationRouter from "./notification";
import MessageRoutes from "./message";
import ProductRouter from "./products";
import UserRouter from './user'
import FlagRouter from './flag'
import StatisticsRouter from './statistics'

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
router.use("/notifications", NotificationRouter);
router.use("/messages", MessageRoutes);
router.use('/admin/user', UserRouter)
router.use('/flag', FlagRouter)
router.use('/statistics', StatisticsRouter)
export default router
