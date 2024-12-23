import { Router } from "express";
import {
  addNewNotificationController,
  callUserNotificationsController,
} from "../controllers/notifications";

const NotificationRouter = Router();

// Get: get all Notifications
NotificationRouter.get("/", callUserNotificationsController);

// Post: add new Notification
NotificationRouter.post("/", addNewNotificationController);

export default NotificationRouter;
