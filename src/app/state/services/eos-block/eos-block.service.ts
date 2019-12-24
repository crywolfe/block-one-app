import { Injectable } from '@angular/core';
import { EosBlock } from 'src/app/state/models/eos-block.model';
import {from, Observable, of} from 'rxjs';
import { JsonRpc } from 'eosjs';
import {EosBlockStore} from 'src/app/state/store/eos-block.store';
import {GetBlockResult} from 'eosjs/dist/eosjs-rpc-interfaces';
import {cacheable} from '@datorama/akita';

@Injectable({
  providedIn: 'root'
})
export class EosBlockService {
  // private readonly URL_INFO = "https://api.eosnewyork.io/v1/chain/get_block";
  // private readonly URL_INFO2 = "https://api.eosnewyork.io/";
  private readonly URL_INFO = 'https://api.eosn.io';
  // private readonly URL_INFO3 = 'https://mainnet.eos.dfuse.io/';

  constructor(private eosBlockStore: EosBlockStore) {}

  getBlocks(headBlockNumber: number) {
    const eosBlockArray: GetBlockResult[] = [];
    for (let i = headBlockNumber; i > headBlockNumber - 10; i--) {
      this.getBlock(i).subscribe((result: GetBlockResult) => {
        // this.eosBlockStore.add(result);
        eosBlockArray.push(result);
        this.eosBlockStore.set(eosBlockArray);
        return eosBlockArray;
      });
    }

  }

  getBlock(blockNumber: number) {
    const rpc = new JsonRpc(this.URL_INFO, { fetch });
    try {
      // const result = await rpc.get_block(blockNumber);
      const result$ = from(rpc.get_block(blockNumber));

      // return cacheable(this.eosBlockStore, result$);
      return result$;
    } catch (e) {
      console.log('Caught exception: ' + e);
      throw e;
    }
  }
}
