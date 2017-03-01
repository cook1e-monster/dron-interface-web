let express = require("express");

const app = express();
const http = require('http').Server(app);
app.set('view engine', 'ejs'); //define engine views in express

const io = require('socket.io')(http);
const Drone = require("rolling-spider");

http.listen(3000, function() {
  console.log('Server is listening on *:3000');
});

app.use('/', function(request, response){
  response.render("templates/home");
});


//create dron
function startDron( dronId, callback ) {

}

//socket
io.on('connection', function( socket ) {
  var drone;

  /* TODO create socket create dron in client */

  //socket creation dron
  socket.on('createDron', function( dronId ){
    console.log(' dronId ', dronId )

    drone = new Drone( dronId, 'forceConnect' );
    drone.isConnected = false;

    drone.connect( function() {
      drone.setup( function() {
        drone.flatTrim();
        drone.startPing();
        drone.flatTrim();

        drone.isConnected = true;
      });
    });
  });


  //socket actions
  socket.on('dron', function( actions ) {

    if( typeof(actions) == 'string' ) {
      actions = JSON.parse( actions )
    }

    if( drone && drone.isConnected ) {
      if( actions.pad == 0 && actions.action == 'stop' ) {
        console.log('stop dron');

      } else if ( actions.pad == 0 ) {
        console.log('functions related with pad 0')
      } else if ( actions.pad == 1 ) {
        console.log('functions related with pad 1')
      } else if ( actions.pad == 2  ){
        console.log('functions related with pad 2')
      }
    }
  });


});
