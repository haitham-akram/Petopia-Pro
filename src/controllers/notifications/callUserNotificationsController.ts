import { type Response, type NextFunction } from "express";
import { type CustomRequest } from "../../interfaces/iUser";
import { callUserNotifications } from "../../queries/notification";

async function callUserNotificationsController(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user?.id as string;

    const userNotifications = await callUserNotifications(userId);

    if (userNotifications.length === 0)
      res.json({
        message: "No notifcation are exist.",
      });

    res.json({
      message: "User Notifcation are here.",
      userNotifications,
    });
  } catch (err) {
    // Passing the error to the route just in case it happened
    next(err);
  }

  //   passing the final result to the route to share the respone if adding new document to the database
  next();
}

export default callUserNotificationsController;
