var fs = require('fs');
const remote = require('electron').remote;
var dgram = require("dgram");
var net = require('net');
var udp_server,tcp_server,dest_ip,client;
var audio = new Audio();

var arr= []; //keeps all file names
var brr= []; //keeps all ips



fs.readdirSync("C:/Users/saks/Downloads").forEach(file => {
  arr.push(file);
});

populate_list(arr);

document.getElementById("close").addEventListener("click", function (e) {
      var window = remote.getCurrentWindow();
      window.close();
 });
