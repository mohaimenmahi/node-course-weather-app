var getUser = (id, callback) => {
  var user = {
    id: id,
    name: 'Mohaimen'
  }
  setTimeout(() => {
    callback(user);
  },3000);
};

getUser(1304153,(userObj) => {
  console.log(userObj);
})
