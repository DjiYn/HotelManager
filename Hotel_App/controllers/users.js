const Users = require('../models/users');

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
            res.status(200);
            res.send(user);
        }
        
    } catch (e) {
        res.status(400);
        res.send(e.message);
    }
};

