"use strict"

const crypto = require('crypto');
const fs = require('fs');

const { symetricKeyPath } = require('../config');

class EncryptionManager {
  constructor() {
    this.cipher = null;
  }

  saveKey(keyValue, keyPath) {
    fs.writeFileSync(keyPath, keyValue);
  }

  importPublicKey(publicKey) {
    this.cipher = crypto.createPublicKey({
      key: publicKey,
      format: 'pem',
      type: 'pkcs1',
    });
  }

  importPrivateKey({ privateKey, passphrase }) {
    this.cipher = crypto.createPrivateKey({
      key: privateKey,
      format: 'pem',
      type: 'pkcs1',
      passphrase
    });
  }

  saveSymetricKey(symetricKey) {
    let encryptedKey;
    if (this.cipher) {
      symetricKey = Buffer.from(encryptionKey, 'utf-8');
      encryptedKey = crypto.publicEncrypt(this.cipher, encryptionKey);
      this.saveKey(encryptedKey, symetricKeyPath);
      return;
    } else {
      throw new Exception('É necessario importar a chave publica do servidor antes de encriptar a chave simetrica local!');
    }
  }

  loadSymetricKey() {
    let symetricKey = '';
    let encSymetricKey = '';

    if (this.cipher) {
      encSymetricKey = fs.readFileSync(symetricKeyPath);

      if (!Buffer.isBuffer(encSymetricKey)) {
        encSymetricKey = Buffer.from(encSymetricKey, 'utf-8');
      }

      symetricKey = crypto.privateDecrypt(this.cipher, encSymetricKey);

      const keyArr = symetricKey.toString('utf8').split(':');
      const IV = keyArr[0];
      const key = keyArr[1];

      return { IV, key };
    } else {
      throw new Exception('É necessario importar a chave privada do servidor antes de decriptar a chave simetrica local');
    }
  }
}

module.exports = EncryptionManager;
