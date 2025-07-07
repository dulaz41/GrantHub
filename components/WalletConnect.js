import * as fcl from "@onflow/fcl";
import "../flow/config";

const Connect = async () => {
    //await fcl.unauthenticate();
    const wallet = await fcl.authenticate();
  
    console.log({ wallet });
    console.log(wallet.addr)
    const result = await fcl.account(wallet.addr);
    console.log({result})
    const flowBalance = result.balance / Math.pow(10, 8);
    console.log({ flowBalance });
}

export default Connect;