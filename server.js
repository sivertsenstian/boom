var express = require('express'),
    fs = require('fs'),
    bodyParser = require('body-parser');

var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use('/', express.static(__dirname + '/source'));

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});


app.post('/highscores', function (request, response) {
  var dto = request.body.dto;
  fs.writeFile(__dirname + '/source/resources/ui/highscores.json', JSON.stringify(dto), function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
  });
  response.send('Highscores saved!');  
}); 