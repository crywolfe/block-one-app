import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {Observable} from 'rxjs';
import {BlockchainDetailsQuery} from './state/services/blockchain-details/blockchain-details.query';
import {BlockchainDetailsService} from './state/services/blockchain-details/blockchain-details.service';
import {EosBlockQuery} from 'src/app/state/services/eos-block/eos-block.query';
import {EosBlockService} from 'src/app/state/services/eos-block/eos-block.service';
import {GetBlockResult} from 'eosjs/dist/eosjs-rpc-interfaces';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  readonly title = 'Block One EOS Fetch App';
  readonly mustacheMarkdownOutput: string;

  component$ = new Subject();
  eosBlocks$: Observable<GetBlockResult[]>;
  loading$: Observable<boolean>;
  loading: boolean;
  fetchDataClicked: boolean;
  headBlockNumber: number;
  eosBlocks: GetBlockResult[];

  constructor(
    private blockchainDetailsQuery: BlockchainDetailsQuery,
    private blockchainDetailsService: BlockchainDetailsService,
    private eosBlockQuery: EosBlockQuery,
    private eosBlockService: EosBlockService
  ) {}

  ngOnInit(): void {
    this.fetchDataClicked = false;
    this.loading$ = this.eosBlockQuery.selectLoading();
    this.loading$.subscribe((loading) => {
      this.loading = loading;
    });
    console.log('Hi Chris,\nI appreciate and thank you for the opportunity to interview. \n Sincerely, Gerry');
  }

  fetchData() {
    this.eosBlocks = [];
    this.fetchDataClicked = true;

    this.blockchainDetailsService.getBlockchainInfo().then((blockchain) => {
      this.headBlockNumber = blockchain.head_block_num;
      if (this.headBlockNumber) {
          this.eosBlockService.getBlocks(this.headBlockNumber);
        }
    });
    this.eosBlocks$ = this.eosBlockQuery.selectAll();
    this.eosBlocks$.pipe(takeUntil(this.component$)).subscribe((blocks) => {
      this.eosBlocks = blocks;
    });
  }

  ngOnDestroy() {
    this.component$.unsubscribe();
  }
}
