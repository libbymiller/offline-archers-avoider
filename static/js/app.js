var lastPlayedPositions = {"TheArchers.mp3":7,"birdsong.mp3":0,"TimWestwood.mp3":0}; /* Archers, birdsong, Tim*/
var currentTrack;
var radiodan = window.Radiodan.create();
//var button = window.Radiodan.button.get('magic');
console.log(window.Radiodan);

var player = radiodan.player.get('main');

function playFromButton(button) {
  var url = button.getAttribute('data-url');
  console.log('play from button', url);
  if(url == "TheArchers.mp3"){
    play(url);
  }else{
    avoidWith(url,10000);
  }
}

/*
  Commands
  You can tell the player to do something
  by calling methods on the `player` object.
*/
/*
  Tell the player to play a file or stream
  and to clear the current playlist first.
*/
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

/*
  Stop playing
*/
function stop() {
  player.stop();
}

/*
  Pause playing
*/
function pause() {
  player.pause({value: true});
}



/*
  Events
  The player will fire an event whenever something
  happens. You can listen to these events to update
  your app.
*/
player.on('player', function (info) {
  updateStatus(info.state);
});

function updateStatus(message) {
  document.querySelector('#status').innerHTML = message;
}

button.on('release', function() {
  console.log('...and relax.');
});
