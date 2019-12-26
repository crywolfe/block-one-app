import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {RicardianContractComponent} from './ricardian-contract.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';
import {AbiService} from 'src/app/state/services/abi/abi.service';
import {GetAbiResult} from 'eosjs/dist/eosjs-rpc-interfaces';

describe('RicardianContractComponent', () => {
  let component: RicardianContractComponent;
  let fixture: ComponentFixture<RicardianContractComponent>;
  let abiService: AbiService;
  const abi: GetAbiResult = {
    abi: undefined,
    account_name: ''};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ NO_ERRORS_SCHEMA ],
      declarations: [ RicardianContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RicardianContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    abiService = new AbiService();
  });

  afterEach(() => {
    component.accountName = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should parse the contract', () => {
    const ricardianSnippet = '<p>{{#if memo}}There is a memo attached to the transfer stating:\n' +
      '{{memo}} {{/if}}</p>';
    ricardianSnippet.split('{{/if}}').join('{{/if memo}}');
    expect(component.parseContract(ricardianSnippet)).toEqual('<p>{{#if memo}}There is a memo attached to the transfer stating:\n' +
      '{{memo}} {{/if memo}}</p>');
  });

  it('should call ricardianModal when clicked', fakeAsync( () => {
    component.accountName = 'TEST_ACCOUNT';
    fixture.detectChanges();
    spyOn(component, 'showRicardianModal');
    const ricardianButton = fixture.debugElement.query(By.css('button'));
    ricardianButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.showRicardianModal).toHaveBeenCalled();
  }));

  it('should show the ricardianDisplay modal if there is an account name', () => {
    component.accountName = 'TEST_ACCOUNT';
    spyOn(abiService, 'getAbi').and.returnValue(Promise.resolve(abi));
    component.showRicardianModal();
    expect(component.ricardianDisplay).toBeTruthy();
  });

  it('should not show the ricardianDisplay modal if there is no account name', () => {
    spyOn(abiService, 'getAbi').and.returnValue(Promise.resolve(abi));
    expect(component.ricardianDisplay).toBeFalsy();
  });
});
