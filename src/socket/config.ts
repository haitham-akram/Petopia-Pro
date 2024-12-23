import { DefaultEventsMap, Server as SocketIOServer } from "socket.io";
import socketConnection from "./userEvents";

let io: SocketIOServer<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
>;

function socketIoConfig(server: any) {
  io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => socketConnection(socket, io));
}

export { socketIoConfig, io };
