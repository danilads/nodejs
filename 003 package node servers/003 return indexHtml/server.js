const express = require('express');
const webserver = express();
var path = require("path");
const port = 3000;

webserver.get('/', (req, res) => {
	console.log('Пришёл запрос от клиента');
	res.sendFile(path.join(__dirname+'/index.html'));
});

webserver.listen(3000, () => console.log('Example app listening on port 3000!'));

