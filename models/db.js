const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/mydb',{ useNewUrlParser : true , useUnifiedTopology: true, useFindAndModify: false }, (err) => {
    if (!err) console.log('connection established');
    else console.log('error occured ', err);
});

require('./employee.model');