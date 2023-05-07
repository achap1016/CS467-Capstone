const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://teamchap:familyoveranything@travelplannercluster.2imvd8g.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    console.log("mongodb connected");
})
.catch(() => {
    console.log("mongodb failed to connect");
});

const LogInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = new mongoose.model("LogInCollection", LogInSchema);

module.exports = collection;