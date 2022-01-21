import { useEffect,useState } from "react";
import web3 from "../ethereum/web3";


export default function test(){
 const[chainid,setChainid] = useState(0);

let accounts;

const setAccountListener = provider => {
    provider.on("accountsChanged", _ => window.location.reload())
    provider.on("chainChanged", _ => window.location.reload())

  }

useEffect(async ()=>{
  
    window.ethereum.request({ method: "eth_requestAccounts" });
    accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);

    await web3.eth.net.getId().then(value=>{setChainid(value)})
        console.log(chainid);
         setAccountListener(window.ethereum)
    },[])


return <h2>Test</h2>
}