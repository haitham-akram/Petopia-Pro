import { io } from "../config";

interface INewPublicNotif {
  messageType?:
  | "new-post"
  | "new-comment"
  actorName: string;
  roomId: string;
  dataHeader: string;
}

function sendNotifToPublicRoom(newPublicNotif: INewPublicNotif) {
  const message = {
    "new-post": `New post added by ${newPublicNotif.actorName}`,
    "new-comment": `${newPublicNotif.actorName} Commented`,
  };
  let spotDataLength = 10;
  const spotData = newPublicNotif.dataHeader.slice(0, spotDataLength) + (newPublicNotif.dataHeader.length > ++spotDataLength ? "..." : "")

  io.to(newPublicNotif.roomId).emit(
    "privateMessage",
    message[newPublicNotif.messageType || "new-post"] + ` :"${spotData}"`
  );
}

export default sendNotifToPublicRoom;