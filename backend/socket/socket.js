import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
    },
});

const userSocketMap = {}; // {userId: socketId}
const areaUserMap = {}; // {areaId: [userId1, userId2, ...]}

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId;
    const areaId = socket.handshake.query.areaId;

    if (userId && areaId) {
        userSocketMap[userId] = socket.id;

        if (!areaUserMap[areaId]) {
            areaUserMap[areaId] = [];
        }
        if (!areaUserMap[areaId].includes(userId)) {
            areaUserMap[areaId].push(userId);
        }

        console.log("User socket map:", userSocketMap);
        console.log("Area user map:", areaUserMap);

        // Emitir los usuarios conectados en la misma área
        io.to(socket.id).emit("getOnlineUsersInArea", areaUserMap[areaId]);
    }

    // Listen for messages sent to an area
    socket.on("sendMessageToArea", ({ message, areaId }) => {
        if (areaUserMap[areaId]) {
            // Emit the message to all users in the area
            areaUserMap[areaId].forEach((userId) => {
                const receiverSocketId = userSocketMap[userId];
                if (receiverSocketId) {
                    io.to(receiverSocketId).emit("newMessage", {
                        message,
                        areaId,
                        senderId: userId,
                    });
                }
            });
        }
    });

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        // Remove the user from the userSocketMap and areaUserMap
        delete userSocketMap[userId];
        if (areaId && areaUserMap[areaId]) {
            areaUserMap[areaId] = areaUserMap[areaId].filter((id) => id !== userId);
            if (areaUserMap[areaId].length === 0) {
                delete areaUserMap[areaId];
            }
        }

        console.log("Updated user socket map:", userSocketMap);
        console.log("Updated area user map:", areaUserMap);

        // Emit updated list of online users in the area
        if (areaId && areaUserMap[areaId]) {
            io.emit("getOnlineUsersInArea", areaUserMap[areaId]);
        }
    });
});

export { app, io, server };
