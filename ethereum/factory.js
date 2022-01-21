import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';
 
const instance = new web3.eth.Contract(CampaignFactory.abi, '0x4C544ac2877a2e3F29C544157FD79e84BD5D6790');

export default instance;
//0x4C544ac2877a2e3F29C544157FD79e84BD5D6790 