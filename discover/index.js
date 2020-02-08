const path = require('path');
const fs = require('fs');
const config = require('../config');

function walk(callback) {
  fs.readdir(config.startDirectory, function(err, files) {
    if (!err) {
      files.forEach(function (file) {
        const filepath = path.join(config.baseDirectory, file);
        fs.stat(filepath, function(err, stats) {
          if (!err) {
            if (stats.isDirectory()) {
              walk(callback);
            } else if (stats.isFile()) {
              const ext = path.extname(filepath).replace('.', '');
              let isWanted = config.extensions.find(wanted => wanted === ext);

              if (isWanted) callback(filepath);
            }
          }
        });
      });
    }
  });
}