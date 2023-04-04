const Users = require('../models/users');
const HotelRooms = require('../models/hotelRooms');

module.exports.getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await Users.findById( id );
        if(user === null || user.length === 0) {
            res.status(404);
            res.send();
        } else {
            res.status(200);
            res.send(user);
        }
    } catch (e) {
        res.status(400);
        res.send(e.message);
    }
};

module.exports.getUsers = async (req, res) => {
    try {
        const users = await Users.find( {} );
        if(users === null || users.length === 0) {
            res.status(404);
            res.send();
        } else {
            res.status(200);
            res.send(users);
        }
    } catch (e) {
        res.status(400);
        res.send(e.message);
    }
};

module.exports.registerUser = async (req, res) => {
    try {
        const {Name, Surname} = req.body;
        const registeredUser = new Users({Name, Surname});
        await registeredUser.save();
        
        if(registeredUser === null || registeredUser.length === 0) {
            res.status(404);
            res.send();
        } else {
            res.status(201);
            res.set("Content-Location", req.baseUrl + "/" + registeredUser.id);
            res.send(registeredUser);
        }
    } catch (e) {
        res.status(400);
        res.send(e.message);
    }
};

module.exports.updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const {Name, Surname} = req.body;
        const user = await Users.findByIdAndUpdate( id, {Name, Surname} );
        
        if(user === null || user.length === 0) {
            res.status(404);
            res.send();
        } else {
            res.status(200);
            res.set("Content-Location", req.baseUrl + "/" + user.id);
            res.send(user);
        }
    } catch (e) {
        res.status(400);
        res.send(e.message);
    }
};

module.exports.deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await Users.findByIdAndDelete( id );
        if(user === null || user.length === 0) {
            res.status(404);
            res.send();
        } else {
            for(let i = 0; i < user.BookedRooms.length; i++) {
                let room = await HotelRooms.findById(user.BookedRooms[i]);

                let remainingUsers = [];
                for(let j = 0; j < room.occupiedBy.length; j++) {
                    if(room.occupiedBy[j] != user.id)
                        remainingUsers.push = room.occupiedBy[j];
                }
                room.occupiedBy = remainingUsers;
                room.save();
            }
            

            res.status(200);
            res.send(user);
        }
        
    } catch (e) {
        res.status(400);
        res.send(e.message);
    }
};



module.exports.getAllBookedRooms = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await Users.findById( id ).populate({path: 'BookedRooms'});
        if(user === null || user.length === 0) {
            res.status(404);
            res.send();

        } else {

            res.status(200);
            res.send(user.BookedRooms);
        }
        
    } catch (e) {
        res.status(400);
        res.send(e.message);
    }
};

module.exports.bookRoomForUser = async (req, res) => {
    try {
        const {id} = req.params;
        const {roomID} = req.body;

        if(roomID == null)
            throw new Error("roomID: user 'roomID' is required!");

        const room = await HotelRooms.findById(roomID);

        if(room == null)
            throw new Error("roomID: 'roomID' does not contain existing room!")

        
        const user = await Users.findById(id);
        user.BookedRooms.push(roomID);
        
        user.save();
        user.populate({path: 'BookedRooms'});

        room.occupiedBy.push(user.id);
        room.lastEdited = Date.now();
        room.save();

        if(user === null || user.length === 0) {
            res.status(404);
            res.send();
        } else {
            res.status(201);
            res.set("Content-Location", req.originalUrl);
            res.send(user);
        }
    } catch (e) {
        res.status(400);
        res.send(e.message);
    }
} 


module.exports.unbookRooms = async (req, res) => {
    try {
        const {id} = req.params;

        const user = await Users.findById(id);

        if(user === null || user.length === 0) {
            res.status(404);
            res.send();

        } else {

            const roomsBooked = [...user.BookedRooms];

            user.BookedRooms = [];
            
            user.save();

            for(let i = 0; i < roomsBooked.length; i++) {
                let room = await HotelRooms.findById(roomsBooked[i]);
                if(room == null)
                    throw new Error("No such room exist!");

                let remainingUsers = [];
                for(let j = 0; j < room.occupiedBy.length; j++) {
                    if(room.occupiedBy[j] != user.id)
                        remainingUsers.push(room.occupiedBy[j]);
                }
                room.occupiedBy = remainingUsers;
                room.lastEdited = Date.now();
                room.save();
            }


            res.status(200);
            res.send(user.BookedRooms);
        }
    } catch (e) {
        res.status(400);
        res.send(e.message);
    }
};