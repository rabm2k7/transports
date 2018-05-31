// transports.js -> provides tor/torrent transfer sockets
//
// (c)2017 Amadeus de Koning / holosphere r&d
//


// load Blob for browser/nodejs compat
var Blob = require('w3c-blob');


var child_process = require('child_process');
var wtmod = child_process.spawn('node', ['modules/wthost.js']);
wtmod.stdout.on('data',
    function (data) {
        console.log('output: ' + data);
    }
);
wtmod.stderr.on('data',
    function (data) {
        console.log('err data: ' + data);
    }
);

var tusmod = child_process.spawn('node', ['modules/tushost.js']);
tusmod.stdout.on('data',
    function (data) {
        console.log('output: ' + data);
    }
);
tusmod.stderr.on('data',
    function (data) {
        console.log('err data: ' + data);
    }
);

var btmod = child_process.spawn('node', ['modules/bthost.js']);
btmod.stdout.on('data',
    function (data) {
        console.log('output: ' + data);
    }
);
btmod.stderr.on('data',
    function (data) {
        console.log('err data: ' + data);
    }
);
//$('#filebuffer').html('<object data="http://bkdn774mehlzlrfz.onion/"/>');

// function uploadFiles(files) {
//alert(JSON.stringify(files));
//  for (var i = 0; i < files.length; i++) {
//    //client.seed(files[i]);
//    var blob = new Blob(["This is my blab content"], {type: "text/plain"});
//    wt_client.seed(blob, {name: "test.bin"})
//  }
//  wt_client.on('torrent', function (torrent) {
//    console.log('infoHash:'+torrent.infoHash);
//    console.log('magnetURI:'+torrent.magnetURI);
//    console.log('torrentFile:'+torrent.torrentFile);
//
//  });

//}
