//node packServer009.js

const express = require('express');
const fs = require('fs'); //file system
const path = require('path'); //путь
const os = require('os'); //нужен для символа пробела

const webserver = express();


//для запросов с axios
webserver.use(express.json()); // мидлварь, умеющая обрабатывать тело запроса в формате JSON

const port = 8080;

webserver.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname+'/index.html'));
});

// POST - (JSON)
webserver.post('/send', (req, res) => {
    console.log('---send',req.body);
});



webserver.listen(port, () => console.log('Listening on port '+port));