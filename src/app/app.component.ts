import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subject, combineLatest} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { BlockchainDetails } from './state/models/blockchainDetails.model';
import { Observable } from 'rxjs';
import { BlockchainDetailsQuery } from './state/services/blockchain-details/blockchainDetails.query';
import { BlockchainDetailsService } from './state/services/blockchain-details/blockchainDetails.service';
import { EosBlockQuery } from './state/services/eos-block/eosBlock.query';
import { EosBlockService } from './state/services/eos-block/eosBlock.service';
import { EosBlock } from './state/models/eosBlock.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  readonly title = 'Block One EOS Fetch App';

  eosInfo = {};
  currentBlockNumber;
  eosBlockInfo = {};

  component$ = new Subject();

  blockchainDetails$: Observable<BlockchainDetails>;
  eosBlock$: Observable<EosBlock>;
  headBlockNumber: number;
  eosBlocks: EosBlock[] = [];

  constructor(
    private blockchainDetailsQuery: BlockchainDetailsQuery,
    private blockchainDetailsService: BlockchainDetailsService,
    private eosBlockQuery: EosBlockQuery,
    private eosBlockService: EosBlockService
  ) {}

  ngOnInit(): void {

    // TODO MAYBE USE COMBINELATEST
    this.blockchainDetailsService.getBlockchainDetails().subscribe((blockChainDetail) => {
      this.headBlockNumber = blockChainDetail.head_block_num;
      // console.log({ headblockNumber: this.headBlockNumber });

      if (this.headBlockNumber) {
        this.eosBlockService
          .getEosBlock(this.headBlockNumber)
          .subscribe((eosBlock) => {
            const newEosBlock: EosBlock = {
              blockNumber: eosBlock.blockNumber,
              timestamp: eosBlock.timestamp,
              transactions: eosBlock.transactions,
              blockHashId: eosBlock.blockHashId
            };
            this.eosBlocks.push(newEosBlock);
            console.log({ insideEosBlock: eosBlock, new: newEosBlock });
          });
      }
    });
    this.blockchainDetails$ = this.blockchainDetailsQuery.selectEntity(0);
    this.eosBlock$ = this.eosBlockQuery.selectEntity(0);

  }

  fetchData() {

  }


  ngOnDestroy() {
    //   this.component$
  }
}
