import { BlockchainDetails } from 'src/app/state/models/blockchainDetails.model';
import { EntityState, EntityStore, StoreConfig, ActiveState } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { BlockchainDetailsService } from 'src/app/state/services/blockchain-details/blockchainDetails.service';

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

  getBlockchainDetailsAction() {
    console.log('in getBlockChainDetails');
    return this.blockchainDetailsService.getBlockchainDetails().subscribe((response) => {
      if (response) {
        initialState.currentBlockNumber = response.head_block_num;
        initialState.currentBlockid = response.head_block_id;
      }
    });

  }
}
