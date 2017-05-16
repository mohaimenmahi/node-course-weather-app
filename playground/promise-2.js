const request = require('request');
const yargs = require('yargs');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      string: true
    }
  })
  .help()
  .argv;

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      var encodeAddress=encodeURIComponent(address);
      request({
        url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`,
        json: true
      }, (error, response, body) => {
        if(error) {
          reject('Unable to connect Google Server.');
        } else if(body.status === 'ZERO_RESULTS') {
            reject('No such address found.');
        } else {
              var data = {
              address: body.results[0].formatted_address,
              latitude: body.results[0].geometry.location.lat,
              longitude: body.results[0].geometry.location.lng
            };
            resolve(data);
        }
      });
    });
  }, 1500);
};

geocodeAddress(argv.address).then((res) => {
  console.log(JSON.stringify(res, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
})

module.exports = {
  geocodeAddress
};
