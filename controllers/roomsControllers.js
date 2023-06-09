const { getSocket } = require("../utils/socket.connection");
const room = require("../models/roomsModel");

exports.addRoom = async (req, res, next) => {
  // console.log("first");
  try {
    let { roomId, host, problems, duration } = req.body;
    // console.log(req.body);
    let roomData = new room({
      roomId,
      password,
      roomType,
      host,
      users: [
        {
          userId: host,
        },
      ],
    });
    await roomData.save();
    console.log("successs ---------------");
    return res.status(200).json({
      message: "room created successfully",
      roomData,
    });
  } catch (error) {
    console.log(error, "could not create room");
    return res.status(500).json({
      message: "something went wrong room not created",
    });
  }
};

exports.joinRoom = async (req, res, next) => {
  try {
    let { roomId, userName } = req.body;
    let roomData = await room
      .findOne({
        roomId,
      })
      .populate("users.userName", "userName");
    if (!roomData) {
      return res.status(404).json({
        message: "room not found",
      });
    }
    roomData.users.push({
      userName: userName,
    });
    await roomData.save();

    return res.status(200).json({
      message: "room joined successfully",
      roomData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.leaveRoom = async (req, res, next) => {
  try {
    let { userName, roomId } = req.body;
    let roomData = await room.findOne({
      roomId,
    });
    let userInRoomIndex = roomData.users.findIndex(
      (user) => user.userName === userName
    );
    if (userInRoomIndex === -1) {
      return res.status(404).json({
        message: "user already left or haven't joined the room",
      });
    }
    roomData.users.splice(userInRoomIndex, 1);
    await roomData.save();
    if (roomData.users.length === 0) {
      await room.findOneAndDelete({
        _id: roomData._id,
      });
    }
    return res.status(200).json({
      message: "room left successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
