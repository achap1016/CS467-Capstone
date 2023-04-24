console.log('script.js loaded');

getCountryName();

async function getCountryName(){
    const response = await fetch('/countryname');
    const data = await response.json();
    console.log(data);
}