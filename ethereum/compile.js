const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname,'build');
fs.removeSync();

const campaignPath = path.resolve(__dirname,'contracts','Campaign.sol');

const source = fs.readFileSync(campaignPath,'utf-8');

var input = {
    language: 'Solidity',
    sources: {
        'Campaign.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {  //first "*" is the file , second "*" is the contract name , and third "*" is to generate all output 
                '*': [ '*' ]
            }
        }
    }
}; 
 
var output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Campaign.sol'];
console.log(output);

//it checks whether the dirctory is present or not.if not it just create
fs.ensureDirSync(buildPath);

for(let contract in output) {
    fs.outputJSONSync(
        path.resolve(buildPath, contract + ".json"),
        output[contract]
    );
    console.log("Contract created ", contract);

}


