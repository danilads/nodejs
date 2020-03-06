//node packServer010.js

const express = require('express');

const webserver = express(); // создаём веб-сервер

webserver.use(express.urlencoded({extended:true})); 

const port = 8080;

webserver.get('/', (req, res) => {
  res.send(`
<button onclick="callJson()">callJson</button>
<button onclick="callXml()">callXml</button>
<button onclick="callText()">callText</button>
<div style="color:red">hello</div>
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

webserver.listen(port,()=>{
  console.log("web server running on port "+port);
});