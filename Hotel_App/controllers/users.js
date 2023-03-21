const Users = require('../models/users');

module.exports.registerUser = async (req, res) => {
    try {
        const {Name, Surname} = req.body;
        const registeredUser = new Users({Name, Surname});
        await registeredUser.save();
        res.send(`Successfully registered: ${Name}, ${Surname}`);
    } catch (e) {
        res.send(e.message);
    }
};

module.exports.updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const {Name, Surname} = req.body;
        const user = await Users.findByIdAndUpdate( id, {Name, Surname} );
        res.send(`Successfully updated: ${id} -> ${Name}, ${Surname}`);
    } catch (e) {
        res.send(e.message);
    }
};

module.exports.deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await Users.findByIdAndDelete( id );
        res.send(`Successfully deleted user: ${id}`);
    } catch (e) {
        res.send(e.message);
    }
};

module.exports.getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await Users.findById( id );
        res.send(`User's data by ID: ${user.Name}, ${user.Surname}`);
    } catch (e) {
        res.send(e.message);
    }
};

module.exports.getUsers = async (req, res) => {
    try {
        const users = await Users.find( {} );
        res.send(`User's data by ID: \n ${users}`);
    } catch (e) {
        res.send(e.message);
    }
};