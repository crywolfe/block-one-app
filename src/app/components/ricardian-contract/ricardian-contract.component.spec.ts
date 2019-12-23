import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RicardianContractComponent } from './ricardian-contract.component';

describe('RicardianContractComponent', () => {
  let component: RicardianContractComponent;
  let fixture: ComponentFixture<RicardianContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RicardianContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RicardianContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
