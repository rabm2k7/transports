var fs = require('fs');
var path = require('path');
var seedthis = require('./seedtorrent.js');

const args = process.argv;
console.log(args[2]);

var ptah = (path.resolve());

var fpath = path.join(ptah, "weave", "up", args[2]);

console.log("file path: ", fpath);

var options = {
  // name: String,            // name of the torrent (default = basename of `path`, or 1st file's name)
  // comment: String,         // free-form textual comments of the author
  // createdBy: String,       // name and version of program used to create torrent
  // creationDate: Date       // creation time in UNIX epoch format (default = now)
  // private: Boolean,        // is this a private .torrent? (default = false)
  // pieceLength: Number      // force a custom piece length (number of bytes)
  // announceList: [[String]] // custom trackers (array of arrays of strings) (see [bep12](http://www.bittorrent.org/beps/bep_0012.html))
  // urlList: [String]        // web seed urls (see [bep19](http://www.bittorrent.org/beps/bep_0019.html))
};

seedthis(fpath, function(err) {
  if (err) {
    console.log(err);
    return err;
  }
  console.log("torrent seeding");
  // return null;
});

// 671229fae048d99085de7e6cd7d6a1b7
