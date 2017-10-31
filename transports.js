// transports.js -> provides tor/torrent transfer sockets
//
// (c)2017 Amadeus de Koning / holosphere r&d
//

// start bittorrent tracker server on 6969
// docs about this -> https://github.com/webtorrent/bittorrent-tracker

var bt_port = '6969';
var bt_host = 'localhost';
const tus_host = '127.0.0.1';
const tus_port = '8000';

var btServer = require('bittorrent-tracker').Server

var bt_server = new btServer({
  udp: true, // enable udp server? [default=true]
  http: true, // enable http server? [default=true]
  ws: true, // enable websocket server? [default=true]
  stats: true, // enable web-based statistics? [default=true]
  filter: function (infoHash, params, cb) {
    // Blacklist/whitelist function for allowing/disallowing torrents. If this option is
    // omitted, all torrents are allowed. It is possible to interface with a database or
    // external system before deciding to allow/deny, because this function is async.

    // It is possible to block by peer id (whitelisting torrent clients) or by secret
    // key (private trackers). Full access to the original HTTP/UDP request parameters
    // are available in `params`.

    // This example only allows one torrent.

	// change to do blacklist/whitelist check
    //var allowed = (infoHash === 'aaa67059ed6bd08362da625b3ae77f6f4a075aaa');
	var allowed = true;

    if (allowed) {
      // If the callback is passed `null`, the torrent will be allowed.
      cb(null);
    } else {
      // If the callback is passed an `Error` object, the torrent will be disallowed
      // and the error's `message` property will be given as the reason.
      cb(new Error('disallowed torrent'));
    }
  }
});

// start tracker server listening (se 0 to listen on a random free port)
bt_server.listen(bt_port, bt_host, function() {
	// report back on what port is listening
	console.log(' [i] tracker http:'+bt_server.http.address().port+' udp:'+bt_server.udp.address().port+' websockets:'+bt_server.ws.address().port);
});

// start tus-upload server on 
// docs about this -> https://github.com/tus/tus-node-server

const tus_factory = require('tus-node-server'); 

const tu_server = new tus_factory.Server();

tu_server.datastore = new tus_factory.FileStore({
	path: 'weave/up'
});

tu_server.listen(tus_port, tus_host, function() {
	// report back on what port is listening
	console.log(' [i]  tus host:'+tus_host+' port:'+tus_port);
});
