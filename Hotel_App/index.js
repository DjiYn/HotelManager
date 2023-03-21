const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB!
const mongoose = require("mongoose");

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/hotel";
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Database connected!");
});


app.get('/', (req, res) => {

    res.send("Hello from docker!");

});

const userRoutes = require("./routes/users");
app.use("/users", userRoutes);

const roomRoutes = require("./routes/hotelRooms");
app.use("/rooms", roomRoutes);



app.listen(port, () => console.log(`app listening on http://localhost:${port}`));