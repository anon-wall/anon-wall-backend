const mongoose = require("mongoose");
const Counsel = require("../models/Counsel");

exports.webSocket = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: process.env.CLIENT_URL,
    },
  });

  const rooms = {};
  const socketToRoom = {};

  io.on("connection", (socket) => {
    socket.on("joinRoom", async (roomId, userId) => {
      if (
        !mongoose.Types.ObjectId.isValid(roomId) ||
        !mongoose.Types.ObjectId.isValid(userId)
      ) {
        return;
      }

      const foundRoom = await Counsel.findById(roomId)
        .select("counselee counselor startDate endDate")
        .lean();

      const now = new Date().toISOString();

      if (
        !(
          foundRoom?.counselee.toString() === userId ||
          foundRoom?.counselor.toString() === userId
        )
      ) {
        socket.emit("accessAuthorization", "입장 권한이 없습니다.");
        return;
      }

      if (!(foundRoom?.startDate >= now && foundRoom?.endDate <= now)) {
        socket.emit("accessAuthorization", "입장 시간이 아닙니다.");
        return;
      }

      const alreadyJoined = rooms[roomId]?.find(
        ([socketIdInThisRoom, userIdInThisRoom]) => {
          return userId === userIdInThisRoom;
        }
      );

      if (rooms[roomId] && alreadyJoined) {
        socket.emit("accessAuthorization", "입장은 한 계정만 가능합니다.");
        return;
      }

      socket.join(roomId);

      if (rooms[roomId]) {
        rooms[roomId].push([socket.id, userId]);
      } else {
        rooms[roomId] = [[socket.id, userId]];
      }

      socketToRoom[socket.id] = roomId;
      const usersInThisRoom = rooms[roomId].filter((id) => id[0] !== socket.id);

      socket.emit("currentUsers", usersInThisRoom);
    });

    socket.on("sendingSignal", ({ userToSignal, callerID, signal }) => {
      io.to(userToSignal).emit("newUserJoined", { callerID, signal });
    });

    socket.on("returningSignal", ({ callerID, signal }) => {
      io.to(callerID).emit("receivingReturnedSignal", {
        signal,
        id: socket.id,
      });
    });

    socket.on("leaveRoom", (roomId) => {
      if (rooms[roomId]) {
        rooms[roomId] = rooms[roomId].filter((id) => id[0] !== socket.id);

        socket.to(roomId).broadcast.emit("userLeft", socket.id);
      }
    });

    socket.on("disconnect", () => {
      const roomId = socketToRoom[socket.id];
      let room = rooms[roomId];

      if (room) {
        room = room.filter((id) => id[0] !== socket.id);
        rooms[roomId] = room;
      }

      socket.to(roomId).emit("userLeft", socket.id);
    });
  });
};
