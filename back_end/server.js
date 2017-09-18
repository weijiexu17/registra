var express = require('express');
var app = express();
bodyParser = require('body-parser');
port = process.env.PORT || 8081;

var cors = require('cors')
 
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/apiRoutes');
routes(app);

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Patient Registion RESTful API server started on http://%s:%s", host, port)

})


app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

module.exports = app;
