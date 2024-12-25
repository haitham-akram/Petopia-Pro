import sendNotifToPublicRoom from "./sendNotifToPublicRoom";
import sendNotifToPrivateRoom from "./sendNotifToPrivateRoom";
import sendMessageEvent from "./sendMessageEvent";

export {
    // send to the public room of the user (Only called by the user him/herself)
    sendNotifToPublicRoom,
    // send by the system to the user depend on the other users action
    sendNotifToPrivateRoom,
    // message sending and user by to users in duplex way (they both can send without wait for the respone from the other user)
    sendMessageEvent
};
