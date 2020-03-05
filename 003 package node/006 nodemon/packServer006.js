//npx nodemon packServer006.js - для запуска на локальной машине
//npx - позволяет заупсить пакет, работает с версии npm 5.2.0

//НЕ СТАВИМ НА ПРОД И НЕ ЗАПУСКАЕМ НА ПРОДЕ (ТОЛЬКО ДЛЯ ТЕСТОВОЙ ОТЛАДКИ)
//nodemon - читает изменения файла, поэтому при измении packServer006.js он автоматом перезагруиться

const express = require('express');

const webserver = express();

const port = 8080;

webserver.get('/', (req, res) => { 
    res.send(`<h2>Hello Nodemon1</h2>`);
});



webserver.listen(port, () => console.log('Listening on port '+port));