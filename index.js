require('./models/db');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const exphbs = require('express-handlebars');


const employeeController = require('./controllers/employeeController');

const app = express();

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs' , defaultLayout : 'mainLayout' , layoutsDir : __dirname + '/views/layouts/' }));

app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({
    extended : true
}))


app.use('/employees' , employeeController);

app.listen(3001 , () => {
    console.log('server is running at 3001');
})