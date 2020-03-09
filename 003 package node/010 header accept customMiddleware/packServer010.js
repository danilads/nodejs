//node packServer010.js

const express = require('express');
const bodyParser = require('body-parser');

const webserver = express(); // создаём веб-сервер


webserver.use(express.json()); // мидлварь, умеющая обрабатывать тело запроса в формате JSON
webserver.use(bodyParser.text()); // мидлварь, умеющая обрабатывать тело запроса в текстовом формате (есть и bodyParser.json())
webserver.use(anyBodyParser);  // это самописная мидлварь, которая тело запроса в виде строки помещает в req.rawBody

const port = 8080;

webserver.get('/', (req, res) => {
  res.send(`
<button onclick="callJson()">callJson</button>
<button onclick="callXml()">callXml</button>
<button onclick="callText()">callText</button>
<br/>
<button onclick="sendJson()">sendJson</button>
<button onclick="sendXml()">sendXml</button>
<button onclick="sendText()">sendText</button>

<script>

const host = window.location.href;

async function callJson() {
    const fetchOptions={
            headers: {
                    'Accept': 'application/json',
            },
    };
    const response=await fetch(host+'req',fetchOptions);
    const data=await response.json();
    console.log("получены данные в формате json",data);
}

async function callXml() {
    const fetchOptions={
            headers: {
                    'Accept': 'application/xml',
            },
    };
    const response=await fetch(host+'req',fetchOptions);
    const xmlStr=await response.text();

    let parser = new DOMParser();
    parsedXml = parser.parseFromString(xmlStr,"text/xml");

    console.log("получены данные в формате xml",parsedXml);
}

async function callText() {
    const response=await fetch(host+'req');
    const data=await response.text();
    console.log("получены данные в текстовом формате",data);
}

function sendJson() {
  const data={aaa:5,bbb:"sss"};
  const fetchOptions={
          method: "post",
          headers: {
                  'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
  };
  fetch(host+'send',fetchOptions);
}

function sendXml() {
  const fetchOptions={
          method: "post",
          headers: {
                  'Content-Type': 'application/xml',
          },
          body: \`
                  <basket>
                          <count>5</count>
                          <price>777</price>
                  </basket>
          \`,
  };
  fetch(host+'send',fetchOptions);
}

function sendText() {
  const fetchOptions={
          method: "post",
          headers: {
                  'Content-Type': 'text/plain',
          },
          body: "hello",
  };
  fetch(host+'send',fetchOptions);
}
</script>
  `);
});
webserver.get('/req', (req, res) => { 
  console.log("request headers",req.headers);
  const clientAccept=req.headers.accept;
  if ( clientAccept==="application/json" ) {
      res.setHeader("Content-Type", "application/json");
      res.send({count:5,price:777});
  }
  else if ( clientAccept==="application/xml" ) {
      res.setHeader("Content-Type", "application/xml");
      res.send("<busket><count>5</count><price>777</price></busket>");
  }
  else {
      res.setHeader("Content-Type", "text/plain");
      res.send("count=5 price=777");
  }
});

webserver.post('/send', (req, res) => { 
  console.log("request headers",req.headers);
  const contentType=req.headers['content-type'];

  if ( contentType==="application/json" ) {
      console.log("получено тело запроса в формате JSON");
      console.log(req.body); // тело запроса преобразовано мидлварью express.json() в хэш
  }
  else if ( contentType==="application/xml" ) {
      console.log("получено тело запроса в формате XML");
      console.log(req.myCustom); // мидлварь anyBodyParser поместила тело запроса в req.myCustom; есть и специализированные мидлвари для этого
  }
  else {
      console.log("получено тело запроса в формате "+contentType);
      console.log(req.body); // тело запроса осталось неизменённым, как прислал клиент
  }
  res.send("");
});

webserver.listen(port,()=>{
  console.log("web server running on port "+port);
});

function anyBodyParser(req, res, next) {
  const contentType=req.headers['content-type'];
  if ( contentType==="application/xml" ) {
      var data = '';
      req.setEncoding('utf8');
      req.on('data', function(chunk) { 
          data += chunk;
      });
      req.on('end', function() {
          req.myCustom = data;
          next();  // myCustom заполнено, вызываем следующую мидлварь в цепочке мидлварей
      });
  }
  else
      next(); // раз это не запрос в формате XML, сразу вызываем следующую мидлварь
}