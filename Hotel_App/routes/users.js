const express = require("express");
const router = express.Router();
const users = require("../controllers/users");

router.route("/").post(users.registerUser).get(users.getUsers);

router.route("/:id").put(users.updateUser).delete(users.deleteUser).get(users.getUser);

module.exports = router;