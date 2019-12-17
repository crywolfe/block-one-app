import { Injectable } from '@angular/core';
import { BlockchainDetails } from 'src/app/state/models/blockchainDetails.model';
import { BlockchainDetailsStore } from 'src/app/state/store/blockchainDetails.store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlockchainDetailsService {

  private readonly URL_INFO = 'https://api.eosnewyork.io/v1/chain/get_info';

  constructor(
    // private blockchainDetailsStore: BlockchainDetailsStore,
    private readonly httpClient: HttpClient) {}

  getBlockchainDetails(): Observable<BlockchainDetails> {
    const body = {};
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    });

    return this.httpClient.post<BlockchainDetails>(this.URL_INFO, body, {
      headers
    });
  }
}