const express = require('express');
const app = express();
const path = require("path");
const port = 3000;
const hbs = require("hbs");
const collection = require("./loginsignupdb");
const countryCityCollection = require("./countrycitydb");
const experiencesCollection = require("./experiencesdb");
const multer = require('multer');

app.use(express.json());
app.set("view engine", "hbs");
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/home", (req, res) => {
    res.render("home");
});

app.post("/home", async(req, res) => {
    const data = {
        country: req.body.country
    };
    await countryCityCollection.deleteMany({ });
    await countryCityCollection.insertMany([data]);
    res.render("home");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/login", async(req, res) => {
    try{
        const check = await collection.findOne({name:req.body.name});
        if (check.password === req.body.password) {
            res.redirect("home");
        } else {
            res.send("Wrong password");
        }
    } catch{
        res.send("Wrong credentials")
    }
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/createexperience", upload.single('image'),  async(req, res) => {
    try {    
        const data = {
            title: req.body.title,
            description: req.body.description,
            experienceType: req.body.experienceType,
            geolocation: req.body.geolocation,
            image: req.file.buffer,
            rating: req.body.rating
        };
        await experiencesCollection.insertMany([data]);
        res.redirect("createexperience");
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

app.post("/signup", async(req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    };
    await collection.insertMany([data]);
    res.redirect("home");
});

app.get("/attractions", async (req, res) => {
    try {
        const experiences = await experiencesCollection.find({experienceType: {$eq: 'Attraction'}});
        const experiencesWithImages = experiences.map(experience => ({
            ...experience._doc,
            image: `data:image/jpeg;base64,${experience.image.toString('base64')}`
        }));
        res.render('viewexperiences', { experiences:experiencesWithImages });
    } catch (error) {
        console.log('Error fetching experience:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get("/activities", async (req, res) => {
    try {
        const experiences = await experiencesCollection.find({experienceType: {$eq: 'Activity'}});
        const experiencesWithImages = experiences.map(experience => ({
            ...experience._doc,
            image: `data:image/jpeg;base64,${experience.image.toString('base64')}`
        }));
        res.render('viewexperiences', { experiences:experiencesWithImages });
    } catch (error) {
        console.log('Error fetching experience:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get("/restaurants", async (req, res) => {
    try {
        const experiences = await experiencesCollection.find({experienceType: {$eq: 'Restaurant'}});
        const experiencesWithImages = experiences.map(experience => ({
            ...experience._doc,
            image: `data:image/jpeg;base64,${experience.image.toString('base64')}`
        }));
        res.render('viewexperiences', { experiences:experiencesWithImages });
    } catch (error) {
        console.log('Error fetching experience:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get("/share", (req, res) => {
    res.render("share");
});

app.get("/createexperience", (req, res) => {
    res.render("createexperience");
});

app.get("/viewexperiences", async (req, res) => {
    try {
        const experiences = await experiencesCollection.find();
        const experiencesWithImages = experiences.map(experience => ({
            ...experience._doc,
            image: `data:image/jpeg;base64,${experience.image.toString('base64')}`
        }));
        res.render('viewexperiences', { experiences:experiencesWithImages });
    } catch (error) {
        console.log('Error fetching experience:', error);
        res.status(500).send('Internal Server Error');
    }
});

// app.get('/countryname', async(request, response) => {
//     const url = 'https://countries-cities.p.rapidapi.com/location/country/list';
//     const options = {
//         method: 'GET',
//         headers: {
//             'content-type': 'application/octet-stream',
//             'X-RapidAPI-Key': '0131b44d98msha90dae1c2be45dap18911ejsnad85a1c2ff5e',
//             'X-RapidAPI-Host': 'countries-cities.p.rapidapi.com'
//         }
//     };
    
//     try {
//         const response = await fetch(url, options);
//         const result = await response.json();
//         console.log(result);
//     } catch (error) {
//         console.error(error);
//     }
// });

// app.get('/cities', async(request, response) => {
//     const countryObject = await countryCityCollection.findOne({ });
//     const country = String(countryObject.country);
//     const url = 'https://countries-cities.p.rapidapi.com/location/country/' + country + '/city/list?page=2&per_page=20&population=1501';
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': '0131b44d98msha90dae1c2be45dap18911ejsnad85a1c2ff5e',
//             'X-RapidAPI-Host': 'countries-cities.p.rapidapi.com'
//         }
//     };
    
//     try {
//         const response = await fetch(url, options);
//         const result = await response.text();
//         console.log(result);
//     } catch (error) {
//         console.error(error);
//     }
// });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});