# transports
the independent transport filesystem layer

## packets

Every packet on the network is a UTF-8 encoded text file, because UTF-8 is byte true and since the ground form of the packet (lzma encrypted version) will always be ASCII, we can even code it back into hexadecimal or binary with position-true binary represenation.


|**type**|**subtype**|**brief descriptor**|
|*definition*|
|ff00|0000|plain text packet|
|Let ff00-0000 be a plain text packet, UTF-8 or ASCII encoded. This is the ONLY unencoded/uncompressed/unencrypted allowed on the network and intended for testing purposes only. All other packets should implement fingerprinting for security on the network.|
||
|ff00|0033|configuration file|
|ff00-0033 is currently in use as the designation for a configuration file for hybridd.|


