//npx nodemon server.js 8080
//node server.js 8080

const express = require('express');
const fs = require('fs'); //file system
const path = require('path'); //путь


const webserver = express();

//для axios 
webserver.use(express.json()); // мидлварь, умеющая обрабатывать тело запроса в формате JSON

const port = process.argv[2];


webserver.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname+'/index.html'));
});

// GET - (не JSON) - Запрос возможных вариантов голосования
webserver.get('/variants', (req, res) => { 
    let variants = [
        {name:"virtus pro",id:'id1'},
        {name:"team secret",id:'id2'},
        {name:"navi",id:'id3'},
        {name:"nigma",id:'id4'}
    ];
    console.log('---variants',variants);
    res.send(variants);
});

// POST - (JSON) - Запрос хранимых данных
webserver.post('/stat', (req, res) => {
    fs.readFile(path.join(__dirname, 'stat.json'), 'utf8', (err, data) => {
        console.log('---stat',data);
        res.setHeader("Content-Type", "application/json");
        res.send(data);
    });
});

// POST - (не JSON) - Изменение (stat.json)
webserver.post('/vote', (req, res) => {
    console.log('---vote',req.body);
    fs.readFile(path.join(__dirname, 'stat.json'), 'utf8', (err, data) => {
        let obj = JSON.parse(data);
        if(typeof obj[req.body.id] === 'number'){
            obj[req.body.id]+=1;
        }
        fs.writeFile(path.join(__dirname, 'stat.json'), JSON.stringify(obj), 'utf8', (err) => {

        });

        res.status(200).end();
    });
});




webserver.listen(port, () => console.log('Listening on port '+port));