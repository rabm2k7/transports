// webtorrent-hybrid server
const wt_host = 'localhost';
const wt_port = '8800';

// start webtorrent-hybrid server for web seeds
// https://webtorrent.io/docs

var WebTorrent = require('webtorrent-hybrid');

var wt_client = null;

if ( 1 ) {

  wt_client = new WebTorrent();

  // browser uses blob
  //var blob = Blob(["This is my blab content"], {type: "text/plain"});
  //wt_client.seed(blob, {name: "test.bin"});

  // nodejs uses Buffers
  var buf = new Buffer('Some content');
  buf.name = 'myname.txt';

  wt_client.seed(buf, function(torrent){
    // do nothing
	console.log('seeding start');
  });

  wt_client.on('torrent', function (torrent) {
    console.log('infoHash:'+torrent.infoHash);
    console.log('magnetURI:'+torrent.magnetURI);
    console.log('torrentFile:'+torrent.torrentFile);

  });


}
