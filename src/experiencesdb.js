const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://teamchap:familyoveranything@travelplannercluster.2imvd8g.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    console.log("experiences mongodb connected");
})
.catch(() => {
    console.log("experiences mongodb failed to connect");
});

const ExperienceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    experienceType: {
        type: String,
        required: true
    },
    geolocation: {
        type: String,
        required: true
    },
    image: {
        type: Buffer,
        required: true
    },
    rating: {
        type: String,
        required: true
    }
});

const experiencesCollection = new mongoose.model("ExperienceCollection", ExperienceSchema);

module.exports = experiencesCollection;