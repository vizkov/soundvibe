function populate_list(arr) {
  const list = document.querySelector('#content');

  var item, text_box1, text_box2, text_box3, text_box4, text_box5, item_name, name_value;

  arr.forEach(function(i) {

    item = document.createElement('div');
    text_box1 = document.createElement('div');
    text_box2 = document.createElement('div');
    text_box3 = document.createElement('p');
    text_box4 = document.createElement('p');
    text_box5 = document.createElement('p');

    item_name = document.createElement('p');
    item_time = document.createElement('p');

    item_name.textContent = "Name";

    text_box1.appendChild(item_name);

    text_box1.classList.add('text');
    text_box1.classList.add('text-1');

    name_value = document.createElement('p');

    name_value.textContent = ":  " + i;

    text_box2.appendChild(name_value);

    text_box2.classList.add('text');
    text_box2.classList.add('text-2');

    text_box3.textContent = "PLAY";
    text_box4.textContent = "LAN";
    text_box5.textContent = "WEB";

    text_box3.classList.add('text');
    text_box3.classList.add('text-3');
    text_box4.classList.add('text');
    text_box4.classList.add('text-4');
    text_box5.classList.add('text');
    text_box5.classList.add('text-5');

    item.appendChild(text_box1);
    item.appendChild(text_box2);
    item.appendChild(text_box3);
    item.appendChild(text_box4);
    item.appendChild(text_box5);
    item.classList.add('element');
    item.classList.add('element-1');
    item.classList.add('clearfix');
    item.style.marginBottom = "1.5%";
    list.appendChild(item);

  });

}

function listen_server(arr, udp_server) {
  udp_server = dgram.createSocket("udp4");
  udp_server.bind(8000);

  udp_server.on("message", function(msg, ip) {
    if (msg == "broadcast") {
      for (i = 0; i < arr.length; ++i) {
        if (arr[i] == ip.ip) {
          break;
        } else {
          arr.push(ip.ip);
          udp_server.send("reply", 0, 5, 8000, ip.ip);
        }
      }

    } else if (msg == "reply") {
      for (i = 0; i < arr.length; ++i) {
        if (arr[i] == ip.ip) {
          break;
        } else {
          arr.push(ip.ip);
        }
      }
    } else if (msg == "connect_tcp") {
      start_tcp();
      udp_server.send("ready_tcp", 0, 9, 8000, ip.ip);
    } else if (msg == "ready_tcp") {
      tcp_connect();
    } else if (msg == "disconnect_tcp") {
      close_tcp();
    }
  });

}

function broadcast_ip() {
  //server.send();
}

function populate_network(arr) {
  const list = document.querySelector('#content');

  var item, text_box6, text_box7, text_box8;

  arr.forEach(function(i) {

    item = document.createElement('div');
    text_box6 = document.createElement('p');
    text_box7 = document.createElement('p');
    text_box8 = document.createElement('p');

    text_box6.textContent = "IP";
    text_box7.textContent = ": "+i;
    text_box8.textContent = "CONNECT";

    text_box6.classList.add('text');
    text_box6.classList.add('text-6');
    text_box7.classList.add('text');
    text_box7.classList.add('text-7');
    text_box8.classList.add('text');
    text_box8.classList.add('text-8');

    item.appendChild(text_box6);
    item.appendChild(text_box7);
    item.appendChild(text_box8);
    item.classList.add('element');
    item.classList.add('element-2');
    item.classList.add('clearfix');
    item.style.marginBottom = "1.5%";
    list.appendChild(item);

  });

}

function play(song_name, audio) {
  audio.pause();
  audio.src = 'C:/' + song_name;
  audio.play();
}

function send_connect(dest_ip, udp_server) {
  udp_server.send("connect_tcp", 0, 11, 8000, dest_ip);
}

function send_disconnect(dest_ip, client, udp_server) {
  udp_server.send("disconnect_tcp", 0, 14, 8000, dest_ip);
  client.destroy();

}

function start_tcp(tcp_server, file_path) {
  var file_input = fs.createReadStream(file_path);
  tcp_server = net.createServer(function(sock) {
    file_input.pipe(sock); //once conn has been established
  }).listen(8000);

}

function close_tcp(tcp_server) {
  tcp_server.destroy();
}

function tcp_connect(dest_ip, new_file_name, client) {
  var file_output = fs.createWriteStream(__dirname + new_file_name);
  client = new net.Socket();
  client.connect(8000, dest_ip, function() {
    client.pipe(file_output);
  });

}


    
function connect_server(){
    var socket = io.connect('https://vizant-tivo.rhcloud.com');
    
}
