var express = require('express')
  , http = require('http')
  , request = require('request')
  , xml2js  = require('xml2js')
  , jsdom   = require("jsdom")
  , sys     = require("sys")
  , app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  return app.use(express.methodOverride());
});

app.configure('development', function() {
  return app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function() {
  return console.log("Express server listening on port " + app.get('port'));
});

app.get('/', function(req, res) {
  var code = "";
  if (req.query.code) {
    code = req.query.code;
  }
  jsdom.env(
      'http://jp.moneycentral.msn.com/investor/quotes/quotes.aspx?symbol=' + code,
      ["http://code.jquery.com/jquery.js"],
      function (errors, body) {
          var corp = body.$("#quickquote>b").text()
          var objToJson = { };
          objToJson.corp = corp;
          res.send(JSON.stringify(objToJson));
      }
  );
});

