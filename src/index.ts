import app from "./app";
import connection from "./database/config";
import { socketIoConfig } from "./socket/config";

connection
  .then(() => {
    console.log("Database connected");
    const server = app.listen(app.get("port"), () => {
      console.log(`App live on: http://localhost:${app.get("port") as number}`);
    });

    socketIoConfig(server);
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });
