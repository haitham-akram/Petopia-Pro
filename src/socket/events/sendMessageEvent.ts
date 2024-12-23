import { io } from "../config";

interface INewPostNotif {
  messageType?: 0 | 1 | 2 | 3 | 4;
  actorName: string;
  roomId: string;
}

function sendMessageForPrivate(newPostNotif: INewPostNotif) {
  const message = [
    `New post added by ${newPostNotif.actorName}.`,
    `${newPostNotif.actorName} Commented on your post.`,
    `${newPostNotif.actorName} Liked your post or comment.`,
    `${newPostNotif.actorName} became a Follower.`,
    `${newPostNotif.actorName} send a new Message.`,
  ][newPostNotif.messageType || 0];

  io.to(newPostNotif.roomId).emit("privateMessage", message);
}

export default sendMessageForPrivate;
