const Crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const EncryptionProvider = require('../utils/EncryptionManager');

const decipher = privateKey => {
  const provider = new EncryptionProvider();
  provider.importPrivateKey(privateKey);
  const { IV, KEY } = provider.loadSymetricKey();

  return Crypto.createDecipheriv(algorithm, KEY, IV);
};

module.exports = decipher;
