import {BlockchainDetails} from 'src/app/state/models/blockchain-details.model';
import {EntityState, EntityStore, StoreConfig, ActiveState} from '@datorama/akita';
import {Injectable} from '@angular/core';

export interface BlockChainDetailsState extends EntityState<BlockchainDetails>, ActiveState<BlockchainDetails> {
  readonly head_block_num: string;
  readonly head_block_id: number;
}

const initialState = {
  currentBlockNumber: undefined,
  currentBlockid: undefined
};

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'blockchainDetails' })
export class BlockchainDetailsStore extends EntityStore<BlockChainDetailsState> {
  constructor() {
    super(initialState);
  }
}
