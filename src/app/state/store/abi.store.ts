import { GetAbiResult, Abi } from 'node_modules/eosjs/dist/eosjs-rpc-interfaces.d';
import {
  EntityState,
  EntityStore,
  StoreConfig,
  ActiveState
} from '@datorama/akita';
import { Injectable } from '@angular/core';
import { AbiService } from 'src/app/state/services/abi/abi.service';

export interface AbiState
  extends EntityState<GetAbiResult>,
    ActiveState<GetAbiResult> {
  readonly account_name: string;
  readonly abi: Abi;
}

const initialState = {
  account_name: undefined,
  abi: undefined
};

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'abi' })
export class AbiStore extends EntityStore<AbiState> {
  constructor(private readonly abiService: AbiService) {
    super(initialState);
  }
}
