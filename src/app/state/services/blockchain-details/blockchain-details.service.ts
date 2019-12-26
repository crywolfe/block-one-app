import {Injectable} from '@angular/core';
import {JsonRpc} from 'eosjs';
import {GetInfoResult} from 'eosjs/dist/eosjs-rpc-interfaces';

@Injectable({
  providedIn: 'root'
})
export class BlockchainDetailsService {
  private readonly URL_INFO = 'https://api.eosn.io';

  async getBlockchainInfo(): Promise<GetInfoResult> {
    const rpc = new JsonRpc(this.URL_INFO, { fetch });
    try {
      return await rpc.get_info();
    } catch (e) {
      console.log('Caught exception: ' + e);
      throw e;
    }
  }
}
