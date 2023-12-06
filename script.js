require("dotenv").config();
const ethers = require('ethers');
const  aavePoolABI  = process.env.AAVEPOOL_ABI;
const erc20ABI  = process.env.ERC20_ABI;



const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_MAINNET_RPC_URL); 
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const erc20Addr = process.env.ERC20_ADDRESSES;
const aavePoolAddr = process.env.AAVEPOOL_ADDRESSES;



const erc20Contract = new ethers.Contract(erc20Addr, erc20ABI, wallet);
const aavePoolContract = new ethers.Contract(aavePoolAddr, aavePoolABI, wallet);

const transferAmount = ethers.utils.parseUnits('10', 18);

async function transferTokensToAave() {
  const approveTx = await erc20Contract.approve(aavePoolAddr, transferAmount);

  const depositTx = await aavePoolContract.deposit(erc20Addr, transferAmount, 0, wallet.address);
}

transferTokensToAave();