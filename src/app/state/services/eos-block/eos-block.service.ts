import { Injectable } from '@angular/core';
import { EosBlock } from 'src/app/state/models/eos-block.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonRpc } from 'eosjs';

@Injectable({
  providedIn: 'root'
})
export class EosBlockService {
  // private readonly URL_INFO = "https://api.eosnewyork.io/v1/chain/get_block";
  // private readonly URL_INFO2 = "https://api.eosnewyork.io/";
  private readonly URL_INFO = 'https://api.eosn.io';
  // private readonly URL_INFO3 = 'https://mainnet.eos.dfuse.io/';
  private resultWithTransactions = {
    transactions: undefined
  };

  constructor(private readonly httpClient: HttpClient) {}

  async getBlock(blockNumber: number) {
    const rpc = new JsonRpc(this.URL_INFO, { fetch });
    try {
      const result = await rpc.get_block(blockNumber);
      console.log(result);
      return result;
    } catch (e) {
      console.log('Caught exception: ' + e);
      throw e;
    }
  }
}
