# transports
the independent transport filesystem layer

## packets

Every packet on the network is a UTF-8 encoded text file, because UTF-8 is byte true and since the ground form of the packet (lzma encrypted version) will always be ASCII, we can even code it back into hexadecimal or binary with position-true binary representation. ff00 is the type reserved for 'system internal' frames right now.

### packet addressing

The address of a package is a hex/ascii string that defines it on the fileshare. This is the unique file id on our cloud share.

**type-subtype-originatorid-timestamp/nonce (optional)-checksum**

For different types or subtypes, processing methodologies may vary, as long as these cases are clearly defined. Originatorid could be the sha256sum of a node broadcasting exchange information, or it could be a sha256sum of a participant on the network, or the alias for a certain chatroom.

### packet size considerations

We will strive to keep packages 'universal' and as light as possible, for which reason excepting *ff00-0000* all packets will likely be lzma compressed (or some other form of compression) by default.  

### packet encryption

The entire packet system builds on NaCl and public+private crypt+sign keypairs that belong together. We'll use the functions provided with NaCl for generating random, nonces and keys since they seem to be fairly dependable. Also check out sha256sum included with NaCl for hashsum checking.

### packet definitions

|**type**|**subtype**|**brief descriptor**|*definition*|
|--|--|--|--|
|ff00|0000|plain text packet|Let ff00-0000 be a plain text packet, UTF-8 or ASCII encoded. This is the ONLY unencoded/uncompressed/unencrypted allowed on the network and intended for testing purposes only. All other packets should implement fingerprinting for security on the network. *Do not make direct use of this packet in integrated solutions, it will only be available in the testing mode of a node, to allow for development of new features, but due to security NOT be available in normal operation.*|
|ff00|0001|shielded crypt key|ff00-0001 is a signed representation of the user's public encryption key. *originatorid* is the sha256sum of the user's public key, or the public key of the service publishing their public key, identifying them publicly on the network. *timestamp* is the unix time. *checksum* a sha256 hash of the contents of the file itself. To check the signature, one still needs to be told the hexadecimal sign key directly, but then its veracity is assured by the sha256sum originatorid and the contents of the signed file itself, without directly disclosing the originator on the network. Hence the name 'shielded' crypt key.|
|ff00|0002|shielded sign key|ff00-0002 is a signed representation of the sign key, signed by the sign key. *originatorid* is the sha256sum of the user's public sign key, or of the service publishing their signing key, identifying them publicly on the network. *timestamp* is the unix time. *checksum* a sha256 hash of the contents of the file itself. To check the signature, one still needs to be told the hexadecimal sign key directly, but then its veracity is assured by the sha256sum originatorid and the contents of the signed file itself, without directly disclosing the originator on the network. Hence the name 'shielded' sign key.|
|ff00|0003|alias|ff00-0003 reserved for aliases on our network. it contains a sha256sum identifier for some packet on the network, that describes the public id or sha256sum of a client on the network, preferably signed by that client. *originatorid* is the sha256sum of the user's UTF-8 encoded alias, or of the service publishing their alias, identifying them publicly on the network. *timestamp* is the unix time of publication. *checksum* a sha256 hash of the contents of the file itself.|
|ff00|0033|configuration file|ff00-0033 is currently in use as the designation for a configuration file for hybridd.|


