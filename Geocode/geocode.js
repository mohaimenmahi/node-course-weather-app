const request = require('request');

var geocodeAddress = (address, callback) => {
  var encodeAddress=encodeURIComponent(address);
  request({
    url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`,
    json: true
  }, (error, response, body) => {
    if(error) {
      callback('Unable to connect Google Server.');
    } else if(body.status === 'ZERO_RESULTS') {
        callback('No data found for the address.');
    } else {
        callback(undefined, {
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
    }
  });
}

module.exports = {
  geocodeAddress
}
