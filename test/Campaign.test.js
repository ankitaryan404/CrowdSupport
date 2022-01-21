const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

 
const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async ()=>{
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({data : "0x"+compiledFactory.evm.bytecode.object})
        .send({from : accounts[0] , gas : '2500000'});

        await factory.methods.createCampaign("400").send({
            from : accounts[0], gas:'2500000'
        });

        [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
        campaign = await new web3.eth.Contract(compiledCampaign.abi,campaignAddress);
});

// describe('Campaigns',()=>{
//     it('deploys a factory and a campaign ',()=>{
//         assert.ok(factory.options.address);
//         assert.ok(campaign.options.address);
//     });

//     it('caller is refer as a manager',async ()=>{
//         const manager = await campaign.methods.manager().call();
//         assert.strictEqual(accounts[0],manager);
//     });

//     it('allows people to contribute as approvers and verify them as approver',async ()=>{
//         await campaign.methods.sendEth().send({
//             value:'400',
//             from : accounts[1]
//         });

//         const contribute = await campaign.methods.contributors(accounts[1]).call();
//         assert.strictEqual('400',contribute);
//     });

//     it("requires a minimum contribution", async () => {
//         try {
//           await campaign.methods.sendEth().send({
//             value: "5",
//             from: accounts[1]
//           });
//           assert(false);
//         } catch (error) {
//           assert(error);
//         }
//       });

//       it('allows manager to make a request description',async ()=>{
//         await campaign.methods.createRequests('for giving a needy people',accounts[1],'200').send({
//             from:accounts[0],
//             gas : '1000000'
//         });

//         const request = await campaign.methods.requests([0]).call();
//         assert.strictEqual('for giving a needy people',request.description);
//       });


//       //final request
    
//   it("processes requests", async () => {
//     // Let accounts[1] contribute 10 ether to the campaign.
//     await campaign.methods.sendEth().send({
//       value: web3.utils.toWei("10", "ether"),
//       from: accounts[1]
//     });

//     // Create a spend request for 5 ether to go to accounts[2].
//     await campaign.methods
//       .createRequests("A cool spend request",accounts[2], web3.utils.toWei("5", "ether") )
//       .send({
//         from: accounts[0],
//         gas: "1500000"
//       });

//     // Approve the spend request.
//     await campaign.methods.voteRequest(0).send({
//       from: accounts[1],
//       gas: "1500000"
//     });

//     // Finalize the request.
//     await campaign.methods.makePayment(0).send({
//       from: accounts[0],
//       gas: "1500000"
//     });

//     let balance = await web3.eth.getBalance(accounts[2]);
//     balance = web3.utils.fromWei(balance, "ether");
//     balance = parseFloat(balance);

//     assert(balance > 104);
//   });
    
// });