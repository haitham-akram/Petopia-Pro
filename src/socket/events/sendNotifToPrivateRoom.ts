import { io } from "../config";

interface INewPrivateNotif {
    messageType: "new-follower" | 'account-suspened';
    actorName: string;
    roomId: string;
}

function sendNotifToPrivateRoom(newPrivateNotif: INewPrivateNotif) {
    const message = {
        'new-follower': `${newPrivateNotif.actorName} start folloewing you.`,
        'account-suspened': `You account have been suspend because of the number of reports reseiv`
    }[newPrivateNotif.messageType as string || "new-follower"]

    io.to(newPrivateNotif.roomId).emit("privateMessage", message);
}

export default sendNotifToPrivateRoom;
