//node packServer002.js

const express = require('express');

const webserver = express(); // создаём веб-сервер

//!!!ОБЯЗАТЕЛЬНО
//для работы с формами
webserver.use(express.urlencoded({extended:true})); 

const port = 8080;
const formType = "GET"; //"GET" "POST"


//Рендер формы 
//val - string - значение инпута
//err - bool - нужно ли выводить ошибку
function renderForm(val,err){
  return `
  <form method=${formType} action="/valid">
    <div>форма ${formType} (Введите число)</div>
    <input name="validateInp" value="${val}" type="text"/>
    <input type="submit">
  </form>
  <div style="color:red">${err?"Введите число":""}</div>
  `
}

//Валидация
function isNumb(str){
  if(typeof str === 'string'){
    return !(/^([0-9]*)$/.test(str));
  }
  else{
    return false;
  }
}

webserver.get('', (req, res) => {
    res.send(renderForm(''));
});

//Валидация "GET"
webserver.get('/valid', (req, res) => {
  console.log('---get',req.query);
  let val = req.query && req.query.validateInp
  let isError = isNumb(val);
  res.send(renderForm(val,isError));
});

//Валидация "POST"
webserver.post('/valid', (req, res) => {
  console.log('---post',req.body);
  let val = req.body && req.body.validateInp
  let isError = isNumb(val);
  res.send(renderForm(val,isError));
});


////----  просим веб-сервер слушать входящие HTTP-запросы на этом порту
webserver.listen(port,()=>{ 
    console.log("web server running on port "+port);
}); 