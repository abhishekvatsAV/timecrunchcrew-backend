const users = require("../models/usersModel");
const axios = require("axios");
exports.registerUser = async (req, res, next) => {
  try {
    let { userName } = req.body;
    let userData = await users.findOne({
      userName,
    });
    if (!userData) {
      userData = new users({
        userName: userName,
      });
      console.log("helo bbg", userData);
      await userData.save();
    }
    return res.status(200).json({
      message: "userData fetched successfully",
      userData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
