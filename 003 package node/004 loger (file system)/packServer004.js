//node packServer004.js

const express = require('express');
const fs = require('fs'); //file system
const path = require('path'); //путь
const os = require('os'); //нужен для символа пробела

const webserver = express();

//для работы с формами (чтобы можно было читать req.query / req.body)
webserver.use(express.urlencoded({extended:true})); 

const port = 8080;
const logPath = path.join(__dirname, '_server.log'); // /Users/daniil/Documents/Repo/nodejs/001-ex/_server.log

// пишет строку в файл лога и одновременно в консоль
// logFilePath - путь где лежит файл логера
// logLine что логируем кроме времени
function loger(logFilePath, logLine) {
    const date=new Date();
    let time=date.toLocaleDateString()+" "+date.toLocaleTimeString(); //locale - это время сервера
    let fullLog=time+" "+logLine;

    console.log(fullLog); // выводим сообщение в консоль

    const logFd = fs.openSync(logFilePath, 'a+'); // и это же сообщение добавляем в лог-файл
    fs.writeSync(logFd, fullLog + os.EOL); // os.EOL - это символ конца строки, он разный для разных ОС
    fs.closeSync(logFd);

    // ФЛАГИ
    // r — Открыть файл для чтения. Если файл не существует, добавляется исключение.
    // г+ — Открыть файл для чтения и записи. Если файл не существует, добавляется исключение.
    // rs — Открыть файл для чтения в синхронном режиме.
    // rs+ — Открыть файл для чтения и записи, запросив у ОС открыть его в синхронном режиме. Смотрите примечания для «rs» относительно использования данного флага.
    // w — Открыть файл для записи. Файл создается (если он не существует) или усекается (если он существует).
    // wx — Работает так же как «w», но не выполняется, если путь существует.
    // w+ — Открыть файл для чтения и записи. Если файл не существует, он создается, если файл существует, он усекается.
    // wx+ — Работает так же как «w+», но не выполняется, если путь существует.
    // a — Открыть файл для дополнения. Если файл не существует, он создается.
    // ax — Работает как «а», но не выполняется, если путь существует.
    // a+ — Открыть файл для чтения и расширения. Если файл не существует, он создается.
    // ах+ — Работает так же как «a+», но не выполняется, если путь существует.
}

////---- Логирует дата время порт
webserver.get('/ex1', (req, res) => { 
    loger(logPath,`[${port}] `+'ex1 called');
    res.send("ex1 ok!");
});

////---- Логирует дата время порт и аргументы
//http://localhost:8080/ex2?arg1=5&arg2=sss
webserver.get('/ex2', (req, res) => { 
    loger(logPath,`[${port}] `+"service2 called, get pars: "+JSON.stringify(req.query));
    res.send("ex2 ok, arg1="+req.query.arg1+" arg2="+req.query.arg2);
});



webserver.listen(port, () => console.log('Listening on port '+port));