import { Injectable } from '@angular/core';
import {from, Observable} from 'rxjs';
import { JsonRpc } from 'eosjs';
import {EosBlockStore} from 'src/app/state/store/eos-block.store';
import {GetBlockResult} from 'eosjs/dist/eosjs-rpc-interfaces';

@Injectable({
  providedIn: 'root'
})
export class EosBlockService {
  private readonly URL_INFO = 'https://api.eosn.io';

  constructor(private eosBlockStore: EosBlockStore) {}

  getBlocks(headBlockNumber: number): GetBlockResult[] {
    const eosBlockArray: GetBlockResult[] = [];
    for (let i = headBlockNumber; i > headBlockNumber - 10; i--) {
      this.getBlock(i).subscribe((result: GetBlockResult) => {
        eosBlockArray.push(result);
        this.eosBlockStore.set(eosBlockArray);
        return eosBlockArray;
      });
    }
    return;
  }

  getBlock(blockNumber: number): Observable<GetBlockResult> {
    const rpc = new JsonRpc(this.URL_INFO, { fetch });
    try {
      return from(rpc.get_block(blockNumber));
    } catch (e) {
      console.log('Caught exception: ' + e);
      throw e;
    }
  }
}
