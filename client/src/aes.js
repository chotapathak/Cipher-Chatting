// import aes256 from 'aes256';
// import crypto from 'crypto';
var aes256 = require('aes256');

var key = 'helloWorld';
// encrypting it using Aes256 
export const DoEncrypt = (text) => {
    var encrypt = aes256.encrypt(key, text);
    return encrypt
};
export const DoDecrypt = (cipher, username) => {
    if (cipher.startsWith('Welcome')) {
        return cipher;
    }
    if (cipher.startsWith(username)) {
        return cipher;
    }
    var decrypted = aes256.decrypt(key, cipher);
    return decrypted;
};