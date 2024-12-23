import { type Response, type NextFunction, type Request } from "express";
import { addNewNotification } from "../../queries/notification";

async function callUserNotificationsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const notifcationData = req.body.notifcationData;

    const userNotifications = await addNewNotification(notifcationData);

    if (userNotifications)
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
