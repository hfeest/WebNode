var express = require('express');
var app = express();
var io = require('socket.io')(app.listen(80));
var five = require('johnny-five');
var http = require('http').Server(app);
app.use(express.static(__dirname + '/app'));
app.get('/', function (req,res) {
  res.sendFile(__dirname + '/index.html');
});

var board = new five.Board({
  repl:false
});
var volta;
board.on('ready', function ()
      
{
var speed, commands, motors;
var volta;
this.pinMode(1, five.Pin.ANALOG);
this.analogRead(1, function(voltage) {
    volta=voltage;
  //volta=(voltage*5)/1023;
  //volta=Math.round(volta*100)/100;
});
var anode = new five.Led.RGB({
pins:
{
red: 9,
green: 11,
blue: 10
},
isAnode: true
});
commands = null;
anode.on();
anode.color("#efe13d");
anode.blink(1000);
var blink = true;
var lastValue;



io.on('connection', function (socket)
{

    //socket.on('my other event', function (data) {
    //  console.log(data);
  //  });



setInterval(function()
{
socket.emit('news',volta);
console.log("valor" + volta);

},500);







  socket.on('azul', function (){
    anode.on();
    anode.color("#4465CC");
    console.log("apreto azul");



  });
  socket.on('verde', function (){
    anode.on();
    anode.color("#009900");
    console.log("apreto verde");
  });
  socket.on('rojo', function (){
    anode.on();
    anode.color("#FF0000");
    console.log("apreto rojo");
  });
  socket.on('stop', function (){
    if (blink){
      anode.stop(); // to stop blinking
      blink = false;
    }
    else{
      anode.blink(1000);
      blink = true;
    }
  });
  socket.on('off', function ()
    {
    anode.off();  // to shut it off (stop doesn't mean "off")
    });
  socket.on('on', function ()
    {
    anode.on(); // to turn on, but not blink
    });


  });
});
