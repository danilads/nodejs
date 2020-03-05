//node packServer007.js

const express = require('express');

const webserver = express();
webserver.use(express.urlencoded({extended:true})); 

const port = 8080;

// http://localhost:8080/?arg=someArg%3Cscript%3Ealert(%22hacked!%22)%3C%2Fscript%3E
webserver.get('/', (req, res) => {
    // добавляем в ответ специальный заголовок, чтобы отключить защитный механизм в Chrome
    res.setHeader("X-XSS-Protection", "0"); 
    res.send("service1 ok, arg="+req.query.arg);
});


webserver.listen(port, () => console.log('Listening on port '+port));