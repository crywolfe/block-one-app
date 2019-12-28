import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AppComponent } from './app.component';
import { BlockTableComponent } from './components/block-table/block-table.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RicardianContractComponent } from './components/ricardian-contract/ricardian-contract.component';
import { MarkdownModule } from 'ngx-markdown';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [AppComponent, BlockTableComponent, RicardianContractComponent],
  imports: [
    BrowserModule,
    ButtonModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    TableModule,
    DialogModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    environment.production ? [] : AkitaNgDevtools.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule {}
