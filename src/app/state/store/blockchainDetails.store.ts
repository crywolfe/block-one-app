import { BlockchainDetails } from 'src/app/state/models/blockchainDetails.model';
import { EntityState, EntityStore, StoreConfig, ActiveState } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { BlockchainDetailsService } from '../services/blockchainDetails.service';

export interface BlockChainDetailsState extends EntityState<BlockchainDetails>, ActiveState {
  readonly currentBlockNumber: string;
  readonly currentBlockId: number;

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
      initialState.currentBlockNumber = response.headBlockNumber;
      initialState.currentBlockid = response.headBlockId;
      console.log({num: response.headBlockNumber, id: response.headBlockId});
    });
  }
}
