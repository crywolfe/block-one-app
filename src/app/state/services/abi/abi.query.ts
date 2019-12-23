import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import {
  AbiState,
  AbiStore
} from 'src/app/state/store/abi.store';

@Injectable({
  providedIn: 'root'
})
export class AbiQuery extends QueryEntity<AbiState> {
  constructor(protected store: AbiStore) {
    super(store);
  }
}
