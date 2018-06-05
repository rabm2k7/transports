var WebTorrent = require('webtorrent-hybrid');
var fs = require('fs');
var path = require('path');

var ptah = (path.resolve());

var client = new WebTorrent();

var torrentId = "magnet:?xt=urn:btih:5b9031518a7f1ff2fd6576efbda52fc71883ac63&dn=671229fae048d99085de7e6cd7d6a1b7&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com";
console.log('torrentId:\t', torrentId);


// console.log(client.torrents);

client.add(torrentId, {
  path: '/weave/down'
}, function(torrent) {
  var files = torrent.files;
  var length = files.length;
  // Stream each file to the disk
  files.forEach(function(file) {

    var source = file.createReadStream();
    var destination = fs.createWriteStream(path.join(ptah, "weave/down", file.name));

    source.on('end', function() {
      console.log('file:\t\t', file.name);
      // close after all files are saved
      if (!--length) {
        process.exit();
      }
    }).pipe(destination);

  });
});
