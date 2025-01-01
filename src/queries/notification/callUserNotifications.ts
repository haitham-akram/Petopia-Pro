import Notification from "../../database/schemas/notficationSchema";

async function callUserNotifications(userId: string) {
  const userNotifications = Notification.find({ userId });
  return await userNotifications;
}

export default callUserNotifications;
