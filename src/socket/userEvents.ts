import eventsTypes from "./eventsTypes";

function userConnecingEvent(s: any) {
  s.on(eventsTypes.JOIN_ROOM[0], (userId: string) => {
    s.join(userId);
    console.log(`User ${userId} joined room ${userId}`);
  });
}

function userSendingEvent(s: any) {
  console.log(`A user connected: ${s.id}`);
  s.on(eventsTypes.SEND_MESSAGE[0], (message: string) => {
    console.log("Received message from client:", message);

    const responseMessage = `Hello from the server! You sent: ${message}`;
    s.emit("serverMessage", responseMessage);
  });
}

function userPrivateSendingEvent(s: any, io: any) {
  s.on(
    eventsTypes.SEND_PRIVATE_MESSAGE[0],
    (userId: string, message: string) => {
      io.to(userId).emit(eventsTypes.SEND_PRIVATE_MESSAGE[0], message);
      console.log(`Sent private message to user ${userId}: ${message}`);
    }
  );
}

function userDisconnectingEvent(s: any) {
  s.on(eventsTypes.LEAVE_ROOM, () => {
    console.log(`User disconnected: ${s.id}`);
  });
}

function socketConnection(s: any, io: any) {
  userSendingEvent(s);
  userConnecingEvent(s);
  userPrivateSendingEvent(s, io);
  userDisconnectingEvent(s);
}

export default socketConnection;
