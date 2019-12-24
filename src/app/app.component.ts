import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import { BlockchainDetails } from './state/models/blockchain-details.model';
import { Observable } from 'rxjs';
import { BlockchainDetailsQuery } from './state/services/blockchain-details/blockchain-details.query';
import { BlockchainDetailsService } from './state/services/blockchain-details/blockchain-details.service';
import { EosBlockQuery } from './state/services/eos-block/eos-block.query';
import { EosBlockService } from './state/services/eos-block/eos-block.service';
import { EosBlock } from './state/models/eos-block.model';

import * as Mustache from 'mustache';
import * as MarkdownIt from 'markdown-it';
import {GetBlockResult} from 'eosjs/dist/eosjs-rpc-interfaces';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  readonly title = 'Block One EOS Fetch App';

  component$ = new Subject();

  blockchainDetails$: Observable<BlockchainDetails>;
  eosBlock$: Observable<GetBlockResult>;
  eosBlocks$: Observable<GetBlockResult[]>;
  headBlockNumber: number;
  eosBlocks: GetBlockResult[];
  fetchDataClicked: boolean;
  mustacheOutput: string;
  mustacheMarkdownOutput: string;
  loading$: Observable<boolean>;
  loading: boolean;

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
      console.log({loading});
      this.loading = loading;
    });

    const templateData = {
      owner: 'Gerry',
      issuer: 'Wolfe',
      ram_payer: 'JOE',
      maximum_supply: '350',
      nowrap: 'NO_WRAP',
      memo: 'G-MEMO',
      quantity: '1000',
      'if memo': true,
      'memo nowrap': 'No Wrap',
      $action: 'ACTION',
      account: 'ACCOUNT'

    };

    // TODO testing...
    const template = '## {{#if memo}} {{memo nowrap}}There is a {{$action.account}} memo attached to the transfer stating:' +
      ' {{memo}} {{/if memo}}';
    this.mustacheOutput = Mustache.render(template, templateData);

    const md = new MarkdownIt();
    this.mustacheMarkdownOutput = md.render(this.mustacheOutput);
  }

  fetchData() {
    this.eosBlocks = [];
    this.fetchDataClicked = true;

    this.blockchainDetailsService.getBlockchainInfo().then((blockchain) => {
      this.headBlockNumber = blockchain.head_block_num;
      console.log(this.headBlockNumber);
      if (this.headBlockNumber) {
          this.eosBlockService.getBlocks(this.headBlockNumber);
        }
    });
    // this.blockchainDetails$ = this.blockchainDetailsQuery.selectEntity(0);
    // this.eosBlock$ = this.eosBlockQuery.selectEntity(0);
    this.eosBlocks$ = this.eosBlockQuery.selectAll();
    this.eosBlocks$.subscribe((blocks) => {
      console.log({blocks});
      this.eosBlocks = blocks;
    });

  }

  ngOnDestroy() {
    this.component$.unsubscribe();
  }
}
