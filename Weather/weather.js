const request = require('request');

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/92120bc134abe16270cdb6410b842674/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if(error) {
      callback('Unable to connect forecast.io server');
    } else if(response.statusCode === 400) {
      callback('Unable to fetch weather');
    } else if(response.statusCode === 200) {
      callback(undefined, {
        Current: body.currently.temperature,
        Apparent: body.currently.apparentTemperature
      });
    }
  });
}

module.exports = {
  getWeather
}
