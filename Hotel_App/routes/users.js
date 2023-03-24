const express = require("express");
const router = express.Router();
const users = require("../controllers/users");

router.route("/")
    .get(users.getUsers)
    .post(users.registerUser);

router.route("/:id")
    .get(users.getUser)
    .put(users.updateUser)
    .delete(users.deleteUser);


module.exports = router;