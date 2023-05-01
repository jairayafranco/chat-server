import express from "express";
import cors from "cors";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import http from "http";

const app = express();
const PORT = 3000;
const server = http.createServer(app);

const io = new SocketServer(server, {
    cors: {
        origin: "*",
    }
});

app.use(cors());
app.use(morgan("dev"));

io.on("connection", (socket) => {
    socket.on("message", (message) => {
        console.log(message);
        socket.broadcast.emit("message", {
            message,
            from: socket.id,
        });
    });
});

server.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});