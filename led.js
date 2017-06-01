var jf =require("johnny-five");
var circuito = new jf.Board();


circuito.on("ready", prender);

function prender()
{
    var led = new jf.Led(13);
    var led2 = new jf.Led(9);
    led.blink(50);
    led2.blink(1000);
    console.log("hola que tal");

}
