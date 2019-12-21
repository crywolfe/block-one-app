import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import { BlockchainDetails } from './state/models/blockchain-details.model';
import { Observable } from 'rxjs';
import { BlockchainDetailsQuery } from './state/services/blockchain-details/blockchain-details.query';
import { BlockchainDetailsService } from './state/services/blockchain-details/blockchain-details.service';
import { EosBlockQuery } from './state/services/eos-block/eos-block.query';
import { EosBlockService } from './state/services/eos-block/eos-block.service';
import { EosBlock } from './state/models/eos-block.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  readonly title = 'Block One EOS Fetch App';

  eosInfo = {};
  currentBlockNumber;

  component$ = new Subject();

  blockchainDetails$: Observable<BlockchainDetails>;
  eosBlock$: Observable<EosBlock>;
  headBlockNumber: number;
  eosBlocks: EosBlock[];

  constructor(
    private blockchainDetailsQuery: BlockchainDetailsQuery,
    private blockchainDetailsService: BlockchainDetailsService,
    private eosBlockQuery: EosBlockQuery,
    private eosBlockService: EosBlockService
  ) {}

  ngOnInit(): void {

  }

  fetchData() {
    this.eosBlocks = [];
    this.blockchainDetailsService.getBlockchainInfo().then((blockchain) => {
      this.headBlockNumber = blockchain.head_block_num;
      if (this.headBlockNumber) {
        for (let i = this.headBlockNumber; i > this.headBlockNumber - 10; i--) {
          console.log(i);
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
            ref_block_prefix: undefined,
          };
          const temp = this.eosBlockService.getBlock(i);
          // const temp = this.eosBlockService.getEosBlock(i);
          temp.then((block) => {
            newEosBlock.timestamp = block.timestamp;
            newEosBlock.producer = block.producer;
            newEosBlock.confirmed = block.confirmed;
            newEosBlock.previous = block.previous;
            newEosBlock.transaction_mroot = block.transaction_mroot;
            newEosBlock.action_mroot = block.action_mroot;
            newEosBlock.schedule_version = block.schedule_version;
            newEosBlock.schedule_version = block.schedule_version;
            newEosBlock.new_producers = block.new_producers;
            newEosBlock.producer_signature = block.producer_signature;
            newEosBlock.transactions = block.transactions;
            newEosBlock.id = block.id;
            newEosBlock.block_num = block.block_num;
            newEosBlock.ref_block_prefix = block.ref_block_prefix;
          });
          this.eosBlocks.push(newEosBlock);
        }
        console.log({ eosBlocks: this.eosBlocks });
      }
    });
    this.blockchainDetails$ = this.blockchainDetailsQuery.selectEntity(0);
    this.eosBlock$ = this.eosBlockQuery.selectEntity(0);
  }


  ngOnDestroy() {
      this.component$.unsubscribe();
  }
}
