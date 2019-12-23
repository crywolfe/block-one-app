import { Injectable } from '@angular/core';
import { GetAbiResult, Abi } from 'node_modules/eosjs/dist/eosjs-rpc-interfaces.d';
import { JsonRpc } from 'eosjs';

@Injectable({
  providedIn: 'root'
})
export class AbiService {
  private readonly URL_INFO = 'https://api.eosn.io';

  constructor() {}

  async getAbi(accountName: string): Promise<GetAbiResult> {
    const rpc = new JsonRpc(this.URL_INFO, { fetch });
    try {
      const result = await rpc.get_abi(accountName);
      console.log(result);
      return result;
    } catch (e) {
      console.log('Caught exception: ' + e);
      throw e;
    }
  }
}
