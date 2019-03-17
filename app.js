const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Checking application environment
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`NODE_ENV: ${app.get('env')}`);


//Adding middleware
app.use(cors());
app.use(bodyparser.json());
app.use(express.static(__dirname + '/dist/kbc/'));

require('./startup/routes')(app);
require('./startup/db')();

//Server
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
