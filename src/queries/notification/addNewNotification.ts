import Notification from "../../database/schemas/notficationSchema";

interface INewNotification {
  userId: string;
  actorId: string;
  type: 0 | 1 | 2 | 3;
  data: {
    postId?: string;
    commentId?: string;
    messageId?: string;
    followeId?: string;
  };
  isRead: {
    type: Boolean;
    default: false;
  };
}

async function addNewNotification(notificationData: INewNotification) {
  const newNotification = new Notification(notificationData);
  return await newNotification.save();
}

export default addNewNotification;
