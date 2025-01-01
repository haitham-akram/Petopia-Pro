import { type Response, type NextFunction } from "express";
import { type CustomRequest } from "../../interfaces/iUser";
import { addNewMessage } from "../../queries/message";
import CustomError from "../../helpers/CustomError";

async function sendMessageController(req: CustomRequest, res: Response, next: NextFunction) {
    try {
        const senderId = req.user!.id;
        const reciverId = req.body.reciverId;
        const messageRoom = req.body.messageRoom;
        const content = req.body.content;
        const attachedId = req.body.attachedId;

        console.log({ senderId, reciverId, messageRoom, content, attachedId })

        const newMessage = await addNewMessage({ senderId, reciverId, messageRoom, content, attachedId });

        if (!newMessage) throw new CustomError(400, "Somthing went wrong.")

        res.status(200).json({
            msg: "The message have been sent.",
            messageData: newMessage
        })

    } catch (err) {
        // Passing the error to the route just in case it happened
        next(err);
    }

    //   passing the final result to the route to share the respone if adding new document to the database
    next();
}

export default sendMessageController;
