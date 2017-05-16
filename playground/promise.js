var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(typeof a ==='number' && typeof b === 'number') {
        resolve(a+b);
      } else {
        reject('Those are no numbers. Please enter two numbers.')
      }
    }, 1500);
  });
};

asyncAdd(5,'7').then((res) => {
  console.log('Result:',res);
  return asyncAdd(res,33);
}, (errorMessage) => {
  console.log(errorMessage);
}).catch((errorMessage) => {
  console.log(errorMessage);
});

// var somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     //resolve('Hey, it works!');
//     reject('Unable to fulfill promise.');
//   }, 2500);
//
// });
//
// somePromise.then((message) => {
//   console.log('Success: ',message);
// }, (errorMessage) => {
//   console.log('Error: ', errorMessage);
// })
