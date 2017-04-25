const mongoose = require('mongoose');

exports.gracefulShutdown = (message, callback) => {
    console.log(message);
    mongoose.disconnect().then(()=>{
        console.log("Successfully disconnected database!");
    }).catch(error=>{
        console.log(error);
    })
    //process.exit(0);
    setTimeout(()=>{
        callback();
    },1000);
}