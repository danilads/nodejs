//node packServer003.js

const express = require('express');
const webserver = express();
var path = require("path");
const port = 8080;

//Открываем доступ к папке public (там должна храниться вся наша раздача)
webserver.use(express.static('public')); 


webserver.get('/', (req, res) => {
	console.log('Пришёл запрос от клиента');
	res.sendFile(path.join(__dirname,'public','/index.html'));
});


webserver.listen(port, () => console.log('Listening on port '+port));

