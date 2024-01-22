import { Server, Socket } from "socket.io";
import userService from "../services/user.service";

const searchSocket = (io: Server, socket: Socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("search", async (query) => {
    const { isError, users, errorMessage } = await userService.findUsers(query);
    //Success
    if (!isError) {
      io.emit("searchResults", users);

      //Error
    } else {
      io.emit("searchResults", errorMessage);
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
};

export { searchSocket };
