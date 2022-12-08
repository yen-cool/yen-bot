import { BigNumber } from 'ethers';

const gwei = BigNumber.from(10 ** 9);

const ether = gwei.mul(gwei);

export const eth = {
  gwei,
  ether,
};
