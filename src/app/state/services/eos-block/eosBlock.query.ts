import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import {
  EosBlockState,
  EosBlockStore
} from 'src/app/state/store/eosBlock.store';

@Injectable({
  providedIn: 'root'
})

export class EosBlockQuery extends QueryEntity<EosBlockState> {
  constructor(protected store: EosBlockStore) {
    super(store);
  }
}
