import { EosBlock } from 'src/app/state/models/eosBlock.model';
import {
  EntityState,
  EntityStore,
  StoreConfig,
  ActiveState
} from '@datorama/akita';
import { Injectable } from '@angular/core';
import { EosBlockService } from 'src/app/state/services/eos-block/eosBlock.service';

export interface EosBlockState extends EntityState<EosBlock>, ActiveState<EosBlock> {
  readonly blockNumber: string;
  readonly timestamp: string;
  readonly transactions: string[];
  readonly blockHashId: string;

  // TODO loading and saving??
}

const initialState = {
  blockNumber: undefined,
  timestamp: undefined,
  transactions: undefined,
  blockHashId: undefined
};

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'eosBlock' })
export class EosBlockStore extends EntityStore<EosBlockState> {
  constructor(private readonly eosBlockService: EosBlockService) {
    super(initialState);
  }

  getEosBlockAction(headBlockNumber: number) {
    // TODO remove all console logs
    console.log('in getEosBlockAction');
    return this.eosBlockService
      .getEosBlock(headBlockNumber)
      .subscribe(response => {
        initialState.blockNumber = response.blockNumber;
        initialState.blockHashId = response.blockHashId;
        initialState.transactions = response.transactions;
        initialState.timestamp = response.timestamp;

        console.log({
          num: response.blockNumber,
          id: response.blockHashId,
          tx: response.transactions,
          timestamp: response.timestamp
        });
      });
  }
}
