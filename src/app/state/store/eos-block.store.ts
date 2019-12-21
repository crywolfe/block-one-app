import { EosBlock } from 'src/app/state/models/eos-block.model';
import {
  EntityState,
  EntityStore,
  StoreConfig,
  ActiveState
} from '@datorama/akita';
import { Injectable } from '@angular/core';
import { EosBlockService } from 'src/app/state/services/eos-block/eos-block.service';

export interface EosBlockState
  extends EntityState<EosBlock>,
    ActiveState<EosBlock> {
  readonly block_num: string;
  readonly timestamp: string;
  readonly transactions: string[];
  readonly id: string;

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
    return;
  }
}