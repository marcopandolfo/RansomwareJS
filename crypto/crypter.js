'use strict';

const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const Provider = require('../utils/EncryptionManager');

const createCipher = publicKey => {
  let IV = Buffer.alloc(16);
  let KEY = crypto.randomBytes(32);

  IV = Buffer.from(
    Array.prototype.map.call(IV, () => {
      return Math.floor(Math.random() * 256);
    })
  );

  KEY = KEY.toString('hex').slice(0, 32);
  IV = IV.toString('hex').slice(0, 16);

  const symetricKey = `${IV}:${KEY}`;

  const provider = new Provider();
  provider.importPublicKey(publicKey);
  provider.saveSymetricKey(symetricKey);

  return crypto.createCipheriv(algorithm, KEY, IV);
};

module.exports = createCipher;
