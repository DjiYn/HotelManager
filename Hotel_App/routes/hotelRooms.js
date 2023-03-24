const express = require("express");
const router = express.Router();
const hotelRooms = require("../controllers/hotelRooms");

router.route("/")
    .get(hotelRooms.getAllRooms)
    .post(hotelRooms.addRoom);

router.route("/available")
    .get(hotelRooms.getAllEmptyRooms);

router.route("/available/:id")
    .get(hotelRooms.getEmptyRoom)
    .put(hotelRooms.bookARoom);

router.route("/:id")
    .put(hotelRooms.makeRoomEmpty)
    .delete(hotelRooms.deleteRoom);

module.exports = router;