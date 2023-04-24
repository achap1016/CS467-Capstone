const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.get('/countryname', async(request, response) => {
    const url = 'https://countries-cities.p.rapidapi.com/location/country/list';
    const options = {
        method: 'GET',
        headers: {
            'content-type': 'application/octet-stream',
            'X-RapidAPI-Key': '0131b44d98msha90dae1c2be45dap18911ejsnad85a1c2ff5e',
            'X-RapidAPI-Host': 'countries-cities.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
});