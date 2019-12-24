import { EosBlock } from 'src/app/state/models/eos-block.model';
import {
  EntityState,
  EntityStore,
  StoreConfig,
  ActiveState, guid
} from '@datorama/akita';
import { Injectable } from '@angular/core';
import { EosBlockService } from 'src/app/state/services/eos-block/eos-block.service';
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

// TODO HANDLE UI
