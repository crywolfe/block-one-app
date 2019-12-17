import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { BlockchainDetails } from './state/models/blockchainDetails.model';
import { Observable } from 'rxjs';
import { BlockchainDetailsQuery } from './state/services/blockchainDetails.query';
import { BlockchainDetailsService } from './state/services/blockchainDetails.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  readonly title = 'Block One EOS Fetch App';

  private readonly URL_GET_BLOCK =
    'https://api.eosnewyork.io/v1/chain/get_block';
  eosInfo = {};
  currentBlockNumber;
  eosBlockInfo = {};

  component$ = new Subject();

  blockchainDetails$: Observable<BlockchainDetails>;

  constructor(
    private blockchainDetailsQuery: BlockchainDetailsQuery,
    private blockchainDetailsService: BlockchainDetailsService
  ) {}

  ngOnInit(): void {

    this.blockchainDetailsService.getBlockchainDetails().subscribe((s) => {
      console.log({inside: s});
    });
    this.blockchainDetails$ = this.blockchainDetailsQuery.selectEntity(0);
    console.log({outside: this.blockchainDetails$});
  }

  fetchData() {
    this.blockchainDetails$.subscribe((response) => {
      if (response) {
        console.log(response);
      }
    });

    if (this.currentBlockNumber && this.currentBlockNumber > 0) {
      this.fetchEOSBlockData();
    }

  }

  fetchEOSBlockData() {
    const body = {
      block_num_or_id: this.currentBlockNumber
      // block_num_or_id: 95216678
    };
  }

  ngOnDestroy() {
    //   this.component$
  }
}
