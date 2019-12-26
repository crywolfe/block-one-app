import {GetAbiResult} from 'eosjs/dist/eosjs-rpc-interfaces';
import {AbiService} from 'src/app/state/services/abi/abi.service';

describe('Abi Service', () => {
  let service: AbiService;
  const accountName = 'TEST_ACCOUNT';

  const abi: GetAbiResult = {
    abi: undefined,
    account_name: ''
  };

  beforeEach(() => {
    service = new AbiService();
  });

  it('should be an Abi object', () => {
    spyOn(service, 'getAbi').and.returnValue(Promise.resolve(abi));
    const actualAbi = service.getAbi(accountName);
    expect(actualAbi).toBeTruthy();
    expect(service.getAbi).toHaveBeenCalled();
  });
});
