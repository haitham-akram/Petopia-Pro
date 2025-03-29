import { type Response, type NextFunction } from "express";
import { type CustomRequest } from "../../interfaces/iUser";
import { updateLike } from "../../queries/likes";
import { sendNotifToPrivateRoom } from "../../socket/events";

async function addNewLikeController(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    // const userId = req.user!.id as string;
    const actorName = req.userInfo!.fullName as string;
    const userId = req.userInfo!.id as string;
    const relateId = req.params.relateId as string;
    const isComment = Object.keys(req.query).includes("comment");

    await updateLike({ userId, relateId, isComment }).then((likeAdded) => {
      if (likeAdded) {
        sendNotifToPrivateRoom({
          actorName,
          roomId: likeAdded.relateId.toString(),
          messageType: "new-like",
        });
      }
    });

    res.status(201).json({
      message: "Like have been added.",
    });
  } catch (err) {
    // Passing the error to the route just in case it happened
    next(err);
  }

  //   passing the final result to the route to share the respone if adding new document to the database
  next();
}

export default addNewLikeController;
