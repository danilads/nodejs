//node packServer005.js

const express = require('express');

const webserver = express();

const port = 8080;

webserver.get('/ex1', (req, res) => { 
    res.status(401).end(); //end - нужен для того чтобы чтобы браузер получил ответ
});

webserver.get('/ex2', (req, res) => { 
    res.status(401).send("sorry, access denied!"); //401 с ответом
});


webserver.listen(port, () => console.log('Listening on port '+port));