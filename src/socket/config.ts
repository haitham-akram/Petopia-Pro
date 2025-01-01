import { DefaultEventsMap, Server as SocketIOServer } from "socket.io";
import socketConnection from "./userEvents";

/**
 * the config file are similar to the db one. It's work on the run to emit the connection depend events like join leave and send Notification.
 * 
 */


let io: SocketIOServer<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
>;

let socket: any;

function socketIoConfig(server: any) {
  io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket = socket;
    socketConnection(socket, io);
  });
}

export { socketIoConfig, io, socket };
