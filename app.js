const request = require('request');
const yargs = require('yargs');

const geocode = require('./Geocode/geocode.js');
const weather = require('./Weather/weather.js');

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

geocode.geocodeAddress(argv.address, (errorMessage, result) => {
  if(errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(`Address: ${result.address}`);
    weather.getWeather(result.latitude,result.longitude, (errorMessage, weatherRes) => {
      if(errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`Current: ${weatherRes.Current}`);
        console.log(`Apparent: ${weatherRes.Apparent}`);
      }
    })
  }
});
