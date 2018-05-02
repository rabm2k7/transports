# transports
the independent transport filesystem layer

## packets

Every packet on the network is a UTF-8 encoded text file, because UTF-8 is byte true and since the ground form of the packet (lzma encrypted version) will always be ASCII, we can even code it back into hexadecimal or binary with position-true binary represenation. ff00 is the type reserved for 'system internal' frames right now.

### packet addressing

The address of a package is a hex/ascii string that defines it on the fileshare.

**type-subtype-originatorid-timestamp/nonce (optional)-checksum**

For different types or subtypes, processing methodologies may vary, as long as these cases are clearly defined. Originatorid could be the sha256sum of a node broadcasting exchange information, or it could be a sha256sum of a participant on the network, or the alias for a certain chatroom.

### packet size considerations

We will strive to keep out packages 'universal' and as light as possible, for which reason excepting *ff00-0000* all packets will likely be lzma compressed (or some other form of compression) by default.  

### packet definitions

|**type**|**subtype**|**brief descriptor**|*definition*|
|--|--|--|--|
|ff00|0000|plain text packet|Let ff00-0000 be a plain text packet, UTF-8 or ASCII encoded. This is the ONLY unencoded/uncompressed/unencrypted allowed on the network and intended for testing purposes only. All other packets should implement fingerprinting for security on the network.|
|ff00|0001|public key|ff00-0001 is a representation of the user's public sign key.|
|ff00|0033|configuration file|ff00-0033 is currently in use as the designation for a configuration file for hybridd.|


