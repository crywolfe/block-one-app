import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { BlockChainDetailsState, BlockchainDetailsStore } from '../store/blockchainDetails.store';

@Injectable({
  providedIn: 'root'
})

export class BlockchainDetailsQuery extends QueryEntity<BlockChainDetailsState> {

  // fetchBlockChainDetails$

  constructor(protected store: BlockchainDetailsStore) {
    super(store);
  }

  // private getBlockchainDetails: BlockChainDetails {
  //   this.store

  // }
}