import { WsProvider, ApiPromise } from '@polkadot/api';
import {hexToString, hexToU8a} from '@polkadot/util'

// function hexToString(str1) {
//   var hex = str1.toString();
//   var str = '';
//   for (var n = 0; n < hex.length; n += 2) {
//     str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
//   }
//   return str;
// }

let globalApi;

export async function getApi() {
  if (globalApi && globalApi.isConnected) {
    return globalApi;
  }

  const deeperChainWss = 'wss://mainnet-deeper-chain.deeper.network';
  const wsProvider = new WsProvider(deeperChainWss);
  globalApi = await ApiPromise.create({ provider: wsProvider });
  return globalApi;
}

export async function getNftClassList() {
  let api = await getApi();
  // let nftClassList = await api.query.uniques.class.entries();
  let classMetaList = await api.query.uniques.classMetadataOf.entries();
  // let nftList = await api.query.uniques.instanceMetadataOf.entries();
  // nftClassList = nftClassList.map(it => {
  //   let str = it.toString();
  //   let json = JSON.parse(`{${str.split(',{')[1]}`);
  //   return json;
  // });
  classMetaList = classMetaList.map(it => {
    let str = it.toString();
    let json = JSON.parse(`{${str.split(',{')[1]}`);
    let jsonData = JSON.parse(hexToString(json.data.slice(2)))
    return jsonData;
  });
  // nftList = nftList.map(it => {
  //   let str = it.toString();
  //   let json = JSON.parse(`{${str.split(',{')[1]}`);
  //   let jsonData = JSON.parse(hexToString(json.data.slice(2)))
  //   return jsonData;
  // });
  return classMetaList
}

export async function searchDeeperChain(deeperChain) {
  try {
    let api = await getApi();
    let keys = await api.query.uniques.account.entries(deeperChain);
    if (!keys) {
      return []
    }

    const ids = [];
    const nftList = [];

    keys.forEach(([key]) => {
      ids.push([key.args[1], key.args[2]]);
    });
    

    for (const item of ids) {
      let nft = await api.query.uniques.instanceMetadataOf(item[0], item[1])
      if (!nft) {
        continue;
      }

      nft = nft.toHuman();
      if (nft && nft.data) {
        nftList.push(nft.data);
      }
    }
    return nftList.reduce((pre, it) => {
      try {
        pre.push(JSON.parse(it)) 
      } catch(e) {
        
      }
      return pre
    }, [])
  } catch (error) {
    return []
  }
  
}
