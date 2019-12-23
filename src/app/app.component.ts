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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  readonly title = 'Block One EOS Fetch App';

  component$ = new Subject();

  blockchainDetails$: Observable<BlockchainDetails>;
  eosBlock$: Observable<EosBlock>;
  headBlockNumber: number;
  eosBlocks: EosBlock[];
  fetchDataClicked: boolean;
  mustacheOutput: string;
  mustacheMarkdownOutput: string;

  constructor(
    private blockchainDetailsQuery: BlockchainDetailsQuery,
    private blockchainDetailsService: BlockchainDetailsService,
    private eosBlockQuery: EosBlockQuery,
    private eosBlockService: EosBlockService
  ) {}

  ngOnInit(): void {
    this.fetchDataClicked = false;

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
      if (this.headBlockNumber) {
        for (let i = this.headBlockNumber; i > this.headBlockNumber - 10; i--) {
          const newEosBlock: EosBlock = {
            timestamp: undefined,
            producer: undefined,
            confirmed: undefined,
            previous: undefined,
            transaction_mroot: undefined,
            action_mroot: undefined,
            schedule_version: undefined,
            new_producers: null, // no longer contained in API
            producer_signature: undefined,
            transactions: undefined,
            id: undefined,
            block_num: undefined,
            ref_block_prefix: undefined
          };
          this.eosBlockService.getBlock(i).then((block) => {
            newEosBlock.timestamp = block.timestamp;
            newEosBlock.producer = block.producer;
            newEosBlock.confirmed = block.confirmed;
            newEosBlock.previous = block.previous;
            newEosBlock.transaction_mroot = block.transaction_mroot;
            newEosBlock.action_mroot = block.action_mroot;
            newEosBlock.schedule_version = block.schedule_version;
            newEosBlock.schedule_version = block.schedule_version;
            // @ts-ignore
            newEosBlock.new_producers = block.new_producers;
            newEosBlock.producer_signature = block.producer_signature;
            // @ts-ignore
            newEosBlock.transactions = block.transactions;
            newEosBlock.id = block.id;
            newEosBlock.block_num = block.block_num;
            newEosBlock.ref_block_prefix = block.ref_block_prefix;
          });
          this.eosBlocks.push(newEosBlock);
        }
      }
    });
    // this.blockchainDetails$ = this.blockchainDetailsQuery.selectEntity(0);
    // this.eosBlock$ = this.eosBlockQuery.selectEntity(0);

  }

  ngOnDestroy() {
    this.component$.unsubscribe();
  }
}
