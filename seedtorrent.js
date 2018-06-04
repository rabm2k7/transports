module.exports = function(filePath) {

  // var WebTorrent = require('webtorrent-hybrid')
  var WebTorrent = require('webtorrent-hybrid');

  var client = new WebTorrent();

  client.seed(filePath, function(torrent) {
    // console.log('torrentId (info hash):', torrent.infoHash);
    console.log('torrentId (magnet link):', torrent.magnetURI);
    setInterval(function(){
      console.log(torrent.ratio);
      // if(torrent.ratio>=1){
      //   process.exit();
      // }
    },5000);
  });


};
