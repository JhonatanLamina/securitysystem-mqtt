//S.O.S Alert Sent
function sos() {
  var a = confirm("Are you sure you want to report an emergency?");
  if( a == true ){
    console.log("S.O.S Alert Sent");
    message = new Paho.MQTT.Message("SOS");
    message.destinationName = "web.jhonatanlamina@gmail.com/t1";
    client.send(message);
    document.getElementById("state").innerHTML="S.O.S Alert Sent";
    return true;
  }
}
//Create a client instance
client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));
//Set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
var options = {
  useSSL: false,
  userName: "web.jhonatanlamina@gmail.com",
  password: "jhonatanlamina",
  onSuccess:onConnect,
  onFailure:doFail
}
//Connect the client
client.connect(options);
//Called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("Successful Connection");
  document.getElementById("state").innerHTML="Successful Connection";
  client.subscribe("web.jhonatanlamina@gmail.com/t2");
  message = new Paho.MQTT.Message("Connected from remote");
  message.destinationName = "web.jhonatanlamina@gmail.com/t1";
  client.send(message);
}
function doFail(e){
  console.log(e);
  document.getElementById("state").innerHTML=e;
}
//Called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}
//Called when a message arrives
function onMessageArrived(message) {
  console.log("New data received:"+message.payloadString);
  //document.getElementById("sensor").innerHTML=message.payloadString;
  var data = message.payloadString.split("|")
  if (data[0] != 'none'){
    document.getElementById("state").innerHTML=data[0];
  }
  if (data[1] != 'none'){
    document.getElementById("sensor1").innerHTML=data[1];
  }
  if (data[2] != 'none'){
    document.getElementById("sensor2").innerHTML=data[2];
  }
}