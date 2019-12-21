import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { BlockChainDetailsState, BlockchainDetailsStore } from 'src/app/state/store/blockchain-details.store';

@Injectable({
  providedIn: 'root'
})

export class BlockchainDetailsQuery extends QueryEntity<BlockChainDetailsState> {

  constructor(protected store: BlockchainDetailsStore) {
    super(store);
  }

}