const HotelRooms = require('../models/hotelRooms');

module.exports.addRoom = async (req, res) => {
    try {
        const {roomName, roomPrice} = req.body;

        const addedRoom = new HotelRooms({roomName, roomPrice});
        await addedRoom.save();
        res.send(`Successfully added new Room: ${roomName}`);
    } catch (e) {
        res.send(e.message);
    }
}

module.exports.getAllRooms = async (req, res) => {
    try {
        const allRooms = await HotelRooms.find({});
        res.send(`The list of all rooms: \n ${allRooms}`);
    } catch (e) {
        res.send(e.message);
    }
} 

module.exports.getAllEmptyRooms = async (req, res) => {
    try {
        const allRooms = await HotelRooms.find({occupiedBy: []});
        res.send(`The list of all empty rooms: \n ${allRooms}`);
    } catch (e) {
        res.send(e.message);
    }
} 

module.exports.bookARoom = async (req, res) => {
    try {
        const {id} = req.params;
        const {userID} = req.body;
        const roomToBook = await HotelRooms.findById(id);
        roomToBook.occupiedBy.push(userID);
        roomToBook.lastEdited = Date.now();
        roomToBook.save();
        res.send(`Room was booked by user: \n ${roomToBook} \n ${userID}`);
    } catch (e) {
        res.send(e.message);
    }
} 

module.exports.makeRoomEmpty = async (req, res) => {
    try {
        const {id} = req.params;
        const roomToEmpty = await HotelRooms.findById(id);
        roomToEmpty.occupiedBy = [];
        roomToEmpty.lastEdited = Date.now();
        roomToEmpty.save();
        res.send(`Room was emptied: \n ${roomToEmpty}`);
    } catch (e) {
        res.send(e.message);
    }
} 

module.exports.deleteRoom = async (req, res) => {
    try {
        const {id} = req.params;
        const roomToEmpty = await HotelRooms.findByIdAndDelete(id);
        res.send(`Room was deleted: \n ${roomToEmpty}`);
    } catch (e) {
        res.send(e.message);
    }
} 

module.exports.getEmptyRoom = async (req, res) => {
    try {
        const {id} = req.params;
        const roomToEmpty = await HotelRooms.findById(id, {occupiedBy: []});
        res.send(`Room's information: \n ${roomToEmpty}`);
    } catch (e) {
        res.send(e.message);
    }
} 