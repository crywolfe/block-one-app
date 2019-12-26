import { Injectable } from '@angular/core';
import { GetAbiResult } from 'node_modules/eosjs/dist/eosjs-rpc-interfaces.d';
import { JsonRpc } from 'eosjs';

@Injectable({
  providedIn: 'root'
})
export class AbiService {
  private readonly URL_INFO = 'https://api.eosn.io';

  async getAbi(accountName: string): Promise<GetAbiResult> {
    const rpc = new JsonRpc(this.URL_INFO, { fetch });
    try {
      return await rpc.get_abi(accountName);
    } catch (e) {
      console.log('Caught exception: ' + e);
      throw e;
    }
  }
}
