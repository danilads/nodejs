//node packServer001.js

const express = require('express');

const webserver = express(); // создаём веб-сервер

const port = 8080;

////----01  http://localhost:3050/ex1
  webserver.get('/ex1', (req, res) => { 
      console.log("ex1", req.originalUrl); // /ex1
      res.send(`ex1, ${req.originalUrl}`);    // /ex1
  });

////----02 (get параметры)  http://localhost:3050/ex2?arg1=5&arg2=some
  webserver.get('/ex2', (req, res) => {
      console.log("ex2",req.originalUrl) // /ex2?arg1=5&arg2=some
      console.log("ex2", req.query); // ex2 { arg1: '5', arg2: 'some' }
      res.send("ex2, arg1="+req.query.arg1+" arg2="+req.query.arg2); //ex2, arg1=5 arg2=some
  });

////----03 (не get параметры)   http://localhost:3050/ex3/5/some
  webserver.get('/ex3/:arg1/:arg2', (req, res) => {
      console.log("ex3",req.originalUrl) // /ex3/5/some
      console.log("ex3",req.params); // { arg1: '5', arg2: 'some' }
      res.send("ex3, arg1="+req.params.arg1+" arg2="+req.params.arg2); // ex3, arg1=5 arg2=some
  });

////----04 (якорь - проматывает к нужному якорю )  http://localhost:3050/ex4#myanchor
  webserver.get('/ex4', (req, res) => { 
      console.log("ex4",req.originalUrl); // /ex4 (ссылка будет без якоря)
      res.send('<div style="height: 1000px;"><h1>Hello</h1><br/><br/><br/><br/><h1>Hello</h1><a name="myanchor">myanchor</a></div>');
  });


////----05 ошибка 401 http://localhost:3050/ex5
  webserver.get('/ex5', (req, res) => { 
      // при обращении по этому УРЛу - ответ всегда ошибка 401
      console.log(`service3 called`);
      res.status(401).end();
  });

////----06 ошибка 401 c ответом  http://localhost:3050/ex6
  webserver.get('/service4', (req, res) => { 
      // при обращении по этому УРЛу - ответ всегда ошибка 401 и в качестве тела ответа - текст ошибки
      console.log(`service4 called`);
      res.status(401).send("sorry, access denied!");
  });



////----  просим веб-сервер слушать входящие HTTP-запросы на этом порту
  webserver.listen(port, () => console.log('Listening on port '+port));