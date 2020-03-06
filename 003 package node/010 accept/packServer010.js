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
    const data=parseXml(xmlStr);
    console.log("получены данные в формате xml",data);
}

async function callText() {
    const response=await fetch(host+'req');
    const data=await response.text();
    console.log("получены данные в текстовом формате",data);
}

function parseXml(xml, arrayTags) {
    var dom = null;
    if (window.DOMParser) {
            dom = (new DOMParser()).parseFromString(xml, "text/xml");
    }
    else
            if (window.ActiveXObject)
            {
                    dom = new ActiveXObject('Microsoft.XMLDOM');
                    dom.async = false;
                    if (!dom.loadXML(xml))
                    {
                            throw dom.parseError.reason + " " + dom.parseError.srcText;
                    }
            }
            else
            {
                    throw "cannot parse xml string!";
            }

    function isArray(o)
    {
            return Object.prototype.toString.apply(o) === '[object Array]';
    }

    function parseNode(xmlNode, result)
    {
            if (xmlNode.nodeName == "#text") {
                    var v = xmlNode.nodeValue;
                    if (v.trim()) {
                    result['#text'] = v;
                    }
                    return;
            }

            var jsonNode = {};
            var existing = result[xmlNode.nodeName];
            if(existing)
            {
                    if(!isArray(existing))
                    {
                            result[xmlNode.nodeName] = [existing, jsonNode];
                    }
                    else
                    {
                            result[xmlNode.nodeName].push(jsonNode);
                    }
            }
            else
            {
                    if(arrayTags && arrayTags.indexOf(xmlNode.nodeName) != -1)
                    {
                            result[xmlNode.nodeName] = [jsonNode];
                    }
                    else
                    {
                            result[xmlNode.nodeName] = jsonNode;
                    }
            }

            if(xmlNode.attributes)
            {
                    var length = xmlNode.attributes.length;
                    for(var i = 0; i < length; i++)
                    {
                            var attribute = xmlNode.attributes[i];
                            jsonNode[attribute.nodeName] = attribute.nodeValue;
                    }
            }

            var length = xmlNode.childNodes.length;
            for(var i = 0; i < length; i++)
            {
                    parseNode(xmlNode.childNodes[i], jsonNode);
            }
    }

    var result = {};
    for (let i = 0; i < dom.childNodes.length; i++)
    {
            parseNode(dom.childNodes[i], result);
    }

    return result;
}

  </script>
  `);
});
webserver.get('/req', (req, res) => { 
  console.log(`[${port}] `+"service5 called");

  // т.к. к этому сервису идёт AJAX-запрос со страниц с другим происхождением (origin), надо явно это разрешить
  res.setHeader("Access-Control-Allow-Origin","*"); 

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