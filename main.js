var express  = require('express'),
    client   = require('radiodan-client');

console.log('Hello');

var lastPlayedPositions = {"TheArchers.mp3":7,"birdsong.mp3":0,"TimWestwood.mp3":0}; 
var currentTrack;

/*
  Web
  This makes a web server available at
  localhost on the specified port, the
  default is 5000 so going to
  http://localhost:5000/ in a web browser
  will load `index.html` in ./static.
*/
var web    = express(),
    port   = process.env.PORT || 5000;

// Use the radiodan middleware to enable
// the web pages to send commands to this
// radio
web.use('/radiodan',
  client.middleware({crossOrigin: true})
);

// Make all files in ./static available to web
// pages
web.use(express.static(__dirname + '/static'));
web.listen(port);

console.log('Listening on port ' + port);

var radiodan = client.create();

// button
var button = radiodan.button.get('magic');;


// Get the player object called `main`
// as specified in ./config/radiodan-config.json
var player = radiodan.player.get('main');

// Listen for updates to the music database
// to make sure that we've loaded any
// audio files in `./audio` before we try
// and play them
player.on('database.update.start', function() { console.log('database.update.start'); });
player.on('database.update.end', function() { console.log('database.update.end'); });
player.on('database.modified', function() { console.log('database.update.modified'); });


// Tell the player to update it's database, discovering
// any audio files in the music directory specified in
// the config file.
player
  .updateDatabase();

play("TheArchers.mp3");

// When the music database is updated then
// this will run (see `player.on` code above)
function init() {
  play('crowd.mp3');
}

/*
  General helper function to play a file or
  stream
*/
function play(fileOrStream) {
  player
    .add({ playlist: [fileOrStream] })
    .then(player.play);
}


button.on('release', function() {
  console.log('avoiding!');
  avoidWith("TimWestwood.mp3",10000);
});


function play(fileOrStream) {
  currentTrack = fileOrStream;
  console.log(lastPlayedPositions);
  var seekTime = lastPlayedPositions[fileOrStream];
  if(!seekTime){ seekTime = 0;};
  console.log("starting "+fileOrStream+" at "+seekTime);
  player.add({clear: true, playlist: [fileOrStream]})
      .then(player.play)
      .then(function() {
        return player.seek({ time: seekTime });
      });
}

function avoidWith(fileOrStream, avoidTime){
  play(fileOrStream);
  //hacky. we can't get the real value when we need it at the moment
  var position = lastPlayedPositions["TheArchers.mp3"]
  position = position + 20;
  lastPlayedPositions["TheArchers.mp3"] = position;
  setTimeout(function () {play("TheArchers.mp3")}, avoidTime);
}

