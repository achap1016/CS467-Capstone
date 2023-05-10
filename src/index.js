const express = require('express');
const app = express();
const path = require("path");
const port = 3000;
const hbs = require("hbs");
const collection = require("./loginsignupdb");
const countryCityCollection = require("./countrycitydb");

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

app.post("/signup", async(req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    };
    await collection.insertMany([data]);
    res.redirect("home");
});

app.get("/attractions", (req, res) => {
    res.render("attractions");
});

app.get("/activities", (req, res) => {
    res.render("activities");
});

app.get("/restaurants", (req, res) => {
    res.render("restaurants");
});

app.get("/share", (req, res) => {
    res.render("share");
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