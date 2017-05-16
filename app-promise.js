const request = require('request');
const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fatch for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodeAddress = encodeURIComponent(argv.address);
var geocodeURL = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`;

axios.get(geocodeURL).then((response) => {
  if(response.data.status === 'ZERO_RESULTS') {
    throw new Error('No such address.');
  }
  var formattedAddress = response.data.results[0].formatted_address;
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/92120bc134abe16270cdb6410b842674/${lat},${lng}`;
  console.log(formattedAddress);
  axios.get(weatherUrl).then((response) => {
    var temp = response.data.currently.temperature;
    var apparentTemp = response.data.currently.apparentTemperature;
    console.log(`Temperature: ${temp}`);
    console.log(`Apparent: ${apparentTemp}`);
  })
}).catch((e) => {
  if(e.code === 'ENOTFOUND') {
    console.log('Unable to connect API server.');
  } else {
    console.log(e.message);
  }
});
