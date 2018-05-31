// variables and constants
// bittorrent tracker
const bt_port = '6969';
const bt_host = 'localhost';

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
	//TODO: build in proper whitelisting/blacklisting
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
