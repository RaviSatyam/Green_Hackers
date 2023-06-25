import { useEffect, useState } from 'react';
import { HashConnect } from "hashconnect";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let hashconnect = new HashConnect();

let appMetadata = {
name: "dApp Example",
description: "An example hedera app",
icon: "https://absolute.url/to/icon.png",
};

const PairHashPack = () => {
const [accountId, setAccountId] = useState('');
const navigate = useNavigate();



useEffect(() => {
 const PairHashPack = async () => {

  await hashconnect.init(appMetadata, "testnet", true);
  // console.warn('initdata',initData);
  const timer = setTimeout(() => {
    console.log("No wallet found");
    window.location.href = "https://www.hashpack.app/download";
}, 3000);
  hashconnect.foundExtensionEvent.once(async(walletMetadata) => {
   console.log(walletMetadata);
   console.log('found extenstion works');
   clearTimeout(timer);
   hashconnect.connectToLocalWallet(walletMetadata);

  },[accountId]);
   
  
  

  let accountIdPromise = new Promise((resolve) => {
   hashconnect.pairingEvent.once((pairingData) => {
    const accountId = pairingData.accountIds[0];
    setAccountId(accountId);
    console.log('hashaccountid is:', accountId);
    resolve(accountId);
   });
  });

  accountIdPromise.then((accountId) => {
   axios
    .post("http://localhost:5001/api/user/loginEmitter", { accountId })
    .then((response) => {
     const json = JSON.stringify(response.data.message);
     console.log(json);
     if (response.data.message === 'Redirect to MRV dashboard') {
      navigate('/Sidebar_MRV', {state: {accountId}});
     } else if (response.data.message === 'Redirect to Emitter Dashboard') {
      navigate('/Sidebar_Emitter', {state: {accountId}});
     } else if (response.data.message === 'Redirect to govt dashboard') {
      navigate('/Sidebar', {state: {accountId}});
     } else if (response.data.message === 'Emitter not found redirect to registration dashboard') {
        navigate('/register', {state: {accountId}});
     }
    })
    .catch((error) => {
      if(error.response.data.message === 'User is not Emitter'){ 
            console.log(error.response.data.message);
            toast.warning('Waiting for approval from Government!', {
              position: toast.POSITION.TOP_CENTER
          });
          setTimeout(() => {
            localStorage.clear();
            window.location.reload();
          }, 3000);
      }
     console.log(error);
    });
  });

  const event3 = await accountIdPromise;
  console.log('event3', event3);
 };

 PairHashPack();

},[]);


return (
<>
<ToastContainer />
</>
);
};

export default PairHashPack;