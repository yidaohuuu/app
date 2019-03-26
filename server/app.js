var express = require('express');
const bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('changed!');
});
app.get('/test/read', (req, res) => {
  const fs = require('fs');
  fs.readFile('/tmp/test',{encoding: 'utf-8'}, (err, data) => {
    if (err) {
      throw err
    }
    console.log('the data we got', data)
    res.end(data)
  })
})
app.post('/test/post', (req, res) => {
  const fs = require('fs');
  fs.writeFile("/tmp/test", req.body.value, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
  });
  res.json({val: 'posted'})
})
app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});