import { BlockchainDetails } from 'src/app/state/models/blockchain-details.model';
import { EntityState, EntityStore, StoreConfig, ActiveState } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { BlockchainDetailsService } from 'src/app/state/services/blockchain-details/blockchain-details.service';

export interface BlockChainDetailsState
  extends EntityState<BlockchainDetails>,
    ActiveState<BlockchainDetails> {
  readonly head_block_num: string;
  readonly head_block_id: number;

  // loading and saving
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
  constructor(private readonly blockchainDetailsService: BlockchainDetailsService) {
    super(initialState);
  }

  async getBlockchainDetailsAction() {
    console.log('in getBlockChainDetails');
    return this.blockchainDetailsService.getBlockchainInfo().then((response) => {
      if (response) {
        initialState.currentBlockNumber = response.head_block_num;
        initialState.currentBlockid = response.head_block_id;
      }
    });

  }
}
