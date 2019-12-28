import {
  EntityState,
  EntityStore,
  StoreConfig,
  ActiveState,
} from '@datorama/akita';
import { Injectable } from '@angular/core';
import {GetBlockResult} from 'eosjs/dist/eosjs-rpc-interfaces';

export interface EosBlockState extends EntityState<GetBlockResult>, ActiveState<GetBlockResult> {
  readonly block_num: string;
  readonly timestamp: string;
  readonly transactions: string[];
  readonly id: string;
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'eosBlock'})
export class EosBlockStore extends EntityStore<EosBlockState, GetBlockResult> {
  constructor() {
    super();
  }
}
