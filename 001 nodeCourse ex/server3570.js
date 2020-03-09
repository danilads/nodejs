const express = require('express');
const path = require('path');
const fs = require('fs');

const logLineSync = console.log

const webserver = express();

const port = 8080;
const logFN = path.join(__dirname, '_server.log');

webserver.get('/service1', (req, res) => { 
    logLineSync(logFN,`[${port}] `+"service1 called");

    res.setHeader("Content-Type", "text/plain; charset=UTF-8");

    var readStream=fs.createReadStream( path.join(__dirname,"files/text_utf8.txt") );
    readStream.pipe(res);
});

webserver.get('/service2', (req, res) => { 
    logLineSync(logFN,`[${port}] `+"service2 called");

    res.setHeader("Content-Type", "text/plain; charset=windows-1251");

    var readStream=fs.createReadStream( path.join(__dirname,"files/text_win1251.txt") );
    readStream.pipe(res);
});

webserver.get('/service3', (req, res) => { 
    logLineSync(logFN,`[${port}] `+"service3 called");

    res.setHeader("Content-Type", "text/plain; charset=UTF-8");

    var readStream=fs.createReadStream( path.join(__dirname,"files/text_win1251.txt") );
    readStream.pipe(res);
});

webserver.listen(port,()=>{
    logLineSync(logFN,"web server running on port "+port);
});