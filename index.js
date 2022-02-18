const express = require('express');
const app = express();
const authRoute = require('./routes/auth'); //Import Routes
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const postRoute = require('./routes/posts');
const cron = require('node-cron');
const req = require('express/lib/request');
const fs = require('fs');

dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT ,
 () => console.log('connected to db!')
);

//Middleware
app.use(express.json());

//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

cron.schedule('* * * * *', () => {
    write();
})

function write() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    var dateTime = date + '  ' + time;
    const data = 'data inserted :- ' + dateTime + "\n";
    fs.appendFile("vikas.txt", data,() => {
        console.log("Data is inserted into file after every one minutes");
    })
}

app.listen(3000, () => console.log('server up and running'));