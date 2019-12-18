import { Injectable } from '@angular/core';
import { EosBlock } from 'src/app/state/models/eosBlock.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EosBlockService {
  private readonly URL_INFO =
    'https://api.eosnewyork.io/v1/chain/get_block';

  constructor(private readonly httpClient: HttpClient) {}

  getEosBlock(blockNumber: number): Observable<EosBlock> {
    // TODO body needs to include the blockNumber from BlockChainDetails
    const body = {
      block_num_or_id: blockNumber
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    });

    return this.httpClient.post<EosBlock>(this.URL_INFO, body, {
      headers
    });
  }
}
