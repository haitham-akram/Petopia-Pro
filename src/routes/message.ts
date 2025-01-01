import { Router } from "express";
import { getAllMessagesController, sendMessageController } from "../controllers/message";
import authenticate, { userTypes } from "../middlewares/auth";

const { ADMIN, REGULAR } = userTypes
const MessageRoutes = Router()

// Post: add new message to the database followed with adding send message notification to the recevier
MessageRoutes.post('/', authenticate([ADMIN, REGULAR]), sendMessageController)
MessageRoutes.get('/:roomId', authenticate([ADMIN, REGULAR]), getAllMessagesController)

export default MessageRoutes