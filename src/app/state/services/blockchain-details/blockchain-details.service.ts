import { Injectable } from '@angular/core';
import { BlockchainDetails } from 'src/app/state/models/blockchain-details.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonRpc } from 'eosjs';

@Injectable({
  providedIn: 'root'
})
export class BlockchainDetailsService {
  // private readonly URL_INFO = 'https://api.eosnewyork.io/v1/chain/get_info';
  private readonly URL_INFO = 'https://api.eosn.io';

  constructor(private readonly httpClient: HttpClient) {}

  async getBlockchainInfo() {
    const rpc = new JsonRpc(this.URL_INFO, { fetch });
    try {
      return await rpc.get_info();
    } catch (e) {
      console.log('Caught exception: ' + e);
      throw e;
    }
  }
}
