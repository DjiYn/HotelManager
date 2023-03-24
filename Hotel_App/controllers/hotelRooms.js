const HotelRooms = require('../models/hotelRooms');

module.exports.addRoom = async (req, res) => {
    try {
        const {roomName, roomPrice} = req.body;

        const addedRoom = new HotelRooms({roomName, roomPrice});
        await addedRoom.save();
        if(addedRoom === null || addedRoom.length === 0) {
            res.status(404);
            res.send();
        } else {
            res.status(201);
            res.send(addedRoom);
        }
    } catch (e) {
        res.status(400);
        res.send(e.message);
    }
}

module.exports.getAllRooms = async (req, res) => {
    try {
        const allRooms = await HotelRooms.find({});
        if(allRooms === null || allRooms.length === 0) {
            res.status(404);
            res.send();
        } else {
            res.status(200);
            res.send(allRooms);
        }
    } catch (e) {
        res.status(400);
        res.send(e.message);
    }
} 

module.exports.getAllEmptyRooms = async (req, res) => {
    try {
        const allRooms = await HotelRooms.find({occupiedBy: []});
        if(allRooms === null || allRooms.length === 0) {
            res.status(404);
            res.send();
        } else {
            res.status(200);
            res.send(allRooms);
        }
    } catch (e) {
        res.status(400);
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

        if(roomToBook === null || roomToBook.length === 0) {
            res.status(404);
            res.send();
        } else {
            res.status(201);
            res.send(roomToBook);
        }
    } catch (e) {
        res.status(400);
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
        if(roomToEmpty === null || roomToEmpty.length === 0) {
            res.status(404);
            res.send();
        } else {
            res.status(201);
            res.send(roomToEmpty);
        }
    } catch (e) {
        res.status(400);
        res.send(e.message);
    }
} 

module.exports.deleteRoom = async (req, res) => {
    try {
        const {id} = req.params;
        const roomToDelete = await HotelRooms.findByIdAndDelete(id);
        if(roomToDelete === null || roomToDelete.length === 0) {
            res.status(404);
            res.send();
        } else {
            res.status(200);
            res.send(roomToDelete);
        }
    } catch (e) {
        res.status(400);
        res.send(e.message);
    }
} 

module.exports.getEmptyRoom = async (req, res) => {
    try {
        const {id} = req.params;
        const roomToEmpty = await HotelRooms.findById(id);
        if(roomToEmpty === null || roomToEmpty.length === 0) {
            res.status(404);
            res.send();
        } else {
            res.status(200);
            res.send(roomToEmpty);
        }
    } catch (e) {
        res.status(400);
        res.send(e.message);
    }
} 