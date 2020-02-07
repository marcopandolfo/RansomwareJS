const path = require('path');

const extensions = require('./extensions');

const devConfig = {
  remoteServer: 'https://yourdomain.com',
  extensions,
  symetricKeyPath: path.join(__dirname, '..', 'secret.key'),
  privateKeyPath: path.join(__dirname, '..', 'private.key'),
  passphrasePath: path.join(__dirname, '..', 'passphrase')
};

module.exports = devConfig;
