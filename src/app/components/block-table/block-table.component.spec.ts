import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BlockTableComponent} from './block-table.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {EosBlock} from 'src/app/state/models/eos-block.model';
import {EosBlockService} from 'src/app/state/services/eos-block/eos-block.service';
import {EosBlockStore} from 'src/app/state/store/eos-block.store';

describe('BlockTableComponent', () => {
  let component: BlockTableComponent;
  let fixture: ComponentFixture<BlockTableComponent>;
  let store: EosBlockStore;
  let service: EosBlockService;
  const eosBlock: EosBlock = {
    action_mroot: '',
    block_num: 0,
    confirmed: 0,
    id: '',
    new_producers: null,
    previous: '',
    producer: '',
    producer_signature: '',
    ref_block_prefix: 0,
    schedule_version: 0,
    timestamp: '',
    transaction_mroot: '',
    transactions: []
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      declarations: [ BlockTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = new EosBlockStore();
    service = new EosBlockService(store);
    component.eosBlocks = [eosBlock];
  });

  it('should return the number of txs contained in a block', (done) => {
    eosBlock.transactions = ['test-action'];
    component.getActionCount(eosBlock);
    expect(component.getActionCount(eosBlock)).toEqual(1);
    done();
  });

  it('should get the account name from the transaction', (done) => {
    const tx = {
      trx: {
        transaction: {
          actions: [ {
            account: 'eosio.token.test',
            name: 'transfer'} ]
        }
      }
    };
    expect(component.getAccountName(tx)).toBe('eosio.token.test');
    done();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
