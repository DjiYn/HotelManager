const express = require("express");
const router = express.Router();
const hotelRooms = require("../controllers/hotelRooms");

router.route("/").post(hotelRooms.addRoom).get(hotelRooms.getAllRooms);

router.route("/available").get(hotelRooms.getAllEmptyRooms);
router.route("/available/:id").put(hotelRooms.bookARoom).get(hotelRooms.getEmptyRoom);

router.route("/:id").put(hotelRooms.makeRoomEmpty).delete(hotelRooms.deleteRoom);

module.exports = router;