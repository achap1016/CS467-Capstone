const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://teamchap:familyoveranything@travelplannercluster.2imvd8g.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    console.log("mongodb connected");
})
.catch(() => {
    console.log("mongodb failed to connect");
});

const CountryCitySchema = new mongoose.Schema({
    country: {
        type: String,
        required: true
    }
});

const countryCityCollection = new mongoose.model("CountryCityCollection", CountryCitySchema);

module.exports = countryCityCollection;