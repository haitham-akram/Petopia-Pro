import { type Response, type NextFunction } from "express";
import { type CustomRequest } from "../../interfaces/iUser";
import { getAllMessages } from "../../queries/message";

async function sendMessageController(req: CustomRequest, res: Response, next: NextFunction) {
    try {
        const senderId = req.user?.id as string;
        const roomId = req.params.roomId;

        console.log(senderId, roomId)

        const messages = await getAllMessages(senderId, roomId);

        if (messages.length)
            res.status(200).json({
                msg: "The messages are here.",
                messages
            })
        else
            res.status(200).json({ msg: "No Message are sended yet." })

    } catch (err) {
        // Passing the error to the route just in case it happened
        next(err);
    }

    //   passing the final result to the route to share the respone if adding new document to the database
    next();
}

export default sendMessageController;
