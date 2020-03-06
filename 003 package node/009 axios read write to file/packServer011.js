//node packServer011.js

const express = require('express');
const fs = require('fs'); //file system
const path = require('path'); //путь

const webserver = express(); // создаём веб-сервер

//для axios 
webserver.use(express.json()); // мидлварь, умеющая обрабатывать тело запроса в формате JSON

const port = 8080;

webserver.get('/', (req, res) => {
  res.send(`
  <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.0/axios.min.js"></script>
  <script>
    const host = window.location.href;
    let counter = 0;
    async function readJson(){
      let result = await axios({
        url: host+'read',
        method: 'post'
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {});



      console.log('read',result);
      console.log('read',result.data);
      console.log('read',result.data.counter);
      if(typeof result.data.counter === 'number'){
        counter=result.data.counter;
      }
    }
 

    function writeJson(){
      counter+=1;
      axios({
        url: host+'write',
				method: 'post',
				data: {cnt:counter}
      })
      .then(function (response) {})
      .catch(function (error) {});
    }
  </script>

  <button onclick="readJson()">read</button>
  <button onclick="writeJson()">write +1</button>
  
  
  `);
});
webserver.post('/read', (req, res) => {
  fs.readFile(path.join(__dirname, 'file.json'), 'utf8', (err, data) => {
      console.log('---read',data);
      res.send(data);
  });
});

webserver.post('/write', (req, res) => {

  fs.readFile(path.join(__dirname, 'file.json'), 'utf8', (err, data) => {
      let obj = JSON.parse(data);
   
      if(typeof obj.counter === 'number' && typeof req.body.cnt === 'number'){
          obj.counter = req.body.cnt;
      }
      fs.writeFile(path.join(__dirname, 'file.json'), JSON.stringify(obj), 'utf8', (err) => {

      });

      res.status(200).end();
  });
});

webserver.listen(port,()=>{
  console.log("web server running on port "+port);
});