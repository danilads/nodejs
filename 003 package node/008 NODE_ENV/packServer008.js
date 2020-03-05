//смотрим package.json
//npm run myServDev
//npm run myServProd

const express = require('express');

const webserver = express();
webserver.use(express.urlencoded({extended:true})); 

const port = 8080;

// http://localhost:8080/
webserver.get('/', (req, res) => {
    //прислали из запуска
    console.log("process.env.NODE_ENV",process.env.NODE_ENV);
    console.log("process.env.VAR1",process.env.VAR1);
    res.send("server ok");
});


webserver.listen(port, () => console.log('Listening on port '+port));