const express = require('express');
const app = express();
var path = require("path");

app.get('/', (req, res) => {
	console.log('Пришёл запрос от клиента');
	res.sendFile(path.join(__dirname+'/index.html'));
});

 app.listen(3000, () => console.log('Example app listening on port 3000!'));