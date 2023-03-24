const express = require("express");

const roomController = require("../controllers/roomsControllers");

const router = express.Router();

router.post("/addRoom", roomController.addRoom);
router.post("/joinRoom", roomController.joinRoom);
router.post("/leaveRoom", roomController.leaveRoom);
module.exports = router;
