import {GetInfoResult} from 'eosjs/dist/eosjs-rpc-interfaces';
import {BlockchainDetailsService} from './blockchain-details.service';

describe('Blockchain Details Info Service', () => {
  let service: BlockchainDetailsService;

  const blockchainDetailsInfo: GetInfoResult = {
    block_cpu_limit: 0,
    block_net_limit: 0,
    chain_id: '',
    head_block_id: '',
    head_block_num: 0,
    head_block_producer: '',
    head_block_time: '',
    last_irreversible_block_id: '',
    last_irreversible_block_num: 0,
    server_version: '',
    virtual_block_cpu_limit: 0,
    virtual_block_net_limit: 0
  };

  beforeEach(() => {
    service = new BlockchainDetailsService();
  });

  it('should be a Blockchain Details Info object', () => {
    spyOn(service, 'getBlockchainInfo').and.returnValue(Promise.resolve(blockchainDetailsInfo));
    const actualBlockchainDetails = service.getBlockchainInfo();
    expect(actualBlockchainDetails).toBeTruthy();
    expect(service.getBlockchainInfo).toHaveBeenCalled();
  });
});
