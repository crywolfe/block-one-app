import {EosBlockService} from 'src/app/state/services/eos-block/eos-block.service';
import {EosBlockStore} from 'src/app/state/store/eos-block.store';
import {GetBlockResult} from 'eosjs/dist/eosjs-rpc-interfaces';
import {from} from 'rxjs';
describe('EosBlock Service', () => {
  let service: EosBlockService;
  let store: EosBlockStore;
  const blockNumber = 1;

  const eosBlock1: GetBlockResult = {
    action_mroot: '',
    block_num: 0,
    confirmed: 0,
    id: '',
    previous: '',
    producer: '',
    producer_signature: '',
    ref_block_prefix: 0,
    schedule_version: 0,
    timestamp: '',
    transaction_mroot: ''
  };
  beforeEach(() => {
    store = new EosBlockStore();
    service = new EosBlockService(store);
  });

  it('eosBlocks should contain one block', () => {
    const eosBlocks: GetBlockResult[] = [];
    eosBlocks.push(eosBlock1);
    spyOn(service, 'getBlocks').and.returnValue(eosBlocks);
    const eosBlockLength = service.getBlocks(blockNumber).length;
    expect(eosBlockLength).toBe(eosBlocks.length);
    expect(service.getBlocks).toHaveBeenCalled();

  });

  it('should be a block', () => {
    spyOn(service, 'getBlock').and.returnValue(from(Promise.resolve(eosBlock1)));
    const eosBlock = service.getBlock(blockNumber);
    expect(eosBlock).toBeTruthy();
    expect(service.getBlock).toHaveBeenCalled();

  });
});
