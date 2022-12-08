import { SERVER_CONFIG } from '../config';
import { eth, log, sleep } from '../src/libs';
import { Contract, providers, utils, Wallet } from 'ethers';
import { YEN } from '../contracts';

const maxFeePerGas = eth.gwei.mul(20);
const maxPriorityFeePerGas = eth.gwei.div(100).mul(11);
const provider = new providers.WebSocketProvider(SERVER_CONFIG.PROVIDER['YEN']);
const wallet = new Wallet(SERVER_CONFIG.PRIVATE_KEY['YEN'], provider);
const yenContract = new Contract(YEN.ADDRESS, YEN.ABI, wallet);
const waitConfirmations = 1;

start();

async function start() {
  while (true) {
    try {
      while (true) {
        const amount = (await yenContract.getMints()).div(2);
        log(amount.div(eth.ether).toString())
        if (amount.gte(eth.ether.mul(1350))) {
          await mint();
        }
        await sleep(11);
      }
    } catch (error) {
      log(error);
    }
  }
}

async function mint() {
  let transaction = await yenContract.mint({
    gasLimit: 200000,
    maxFeePerGas: maxFeePerGas,
    maxPriorityFeePerGas: maxPriorityFeePerGas,
  });
  log(
    `mint transaction wait, maxFeePerGas: ${utils.formatUnits(
      transaction.maxFeePerGas,
      'gwei'
    )} gwei, maxPriorityFeePerGas: ${utils.formatUnits(transaction.maxPriorityFeePerGas, 'gwei')} gwei, gasLimit: ${
      transaction.gasLimit
    }, block: ${await provider.getBlockNumber()}`
  );
  try {
    const receipt = await transaction.wait(waitConfirmations);
    log(`mint transaction success, gasUsed: ${receipt.gasUsed}`);
  } catch (error) {
    log(error);
  }
}
