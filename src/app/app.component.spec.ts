import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Block One EOS Fetch App'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Block One EOS Fetch App');
  });

  it('should call fetchData when the load button is clicked', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    spyOn(app, 'fetchData');
    const loadingButton = fixture.debugElement.query(By.css('p-button'));
    loadingButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(app.fetchData).toHaveBeenCalled();
  });
});
