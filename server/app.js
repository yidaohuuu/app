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
app.post('/test/post', (req, res) => {
  console.log('what is sent', req.body)
  const fs = require('fs');
  fs.writeFile("/tmp/test", JSON.stringify(req.body), function(err) {
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