const path = require('path');

const extensions = require('./extensions');

const devConfig = {
  remoteServer: 'http://localhost:3333',
  extensions,
  symetricKeyPath: path.join(__dirname, '..', 'secret.key'),
  privateKeyPath: path.join(__dirname, '..', 'private.key'),
  passphrasePath: path.join(__dirname, '..', 'passphrase')
};

module.exports = devConfig;
