// node server3060.js
const express = require('express');

const webserver = express();

webserver.use(express.urlencoded({extended:true}));

const port = 3060;

webserver.get('', (req, res) => { 
    // при обращении по этому УРЛу - просто отдаём строку
    // миддлварь urlencoded ничего не меняла, она реагирует на конкретный формат запроса - application/x-www-form-urlencoded
    console.log('service1 called');
    res.send(`
    <form method=POST action="http://localhost:3060/service6" target=example>
        ваш логин: <input type=text name=login><br/>
        ваш возраст: <input type=number name=age><br/>
        <input type=submit value="локальный POST-сервис /service6 отдаёт строку, зависящую от POST-параметров запроса">
</form>
`);
});

webserver.post('/service6', (req, res) => { 
    // при обращении по этому УРЛу - ответ зависит от POST-данных
    // миддлварь urlencoded раскодировала данные POST-запроса и положила в req.body
    console.log('service6 called, req.body=',req.body);
    res.send("service6 ok, login="+req.body.login+" age="+req.body.age);
});

webserver.listen(port,()=>{
    console.log("web server running on port "+port);
});