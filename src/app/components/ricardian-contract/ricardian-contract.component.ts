import { Component, OnInit, Input } from '@angular/core';
import { AbiQuery } from 'src/app/state/services/abi/abi.query';
import { AbiService } from 'src/app/state/services/abi/abi.service';
import * as MarkdownIt from 'markdown-it';
import * as Mustache from 'mustache';

@Component({
  selector: 'app-ricardian-contract',
  templateUrl: './ricardian-contract.component.html',
  styleUrls: ['./ricardian-contract.component.scss']
})
export class RicardianContractComponent implements OnInit {
  @Input() accountName: string;

  ricardianContract: string;
  ricardianDisplay = false;

  constructor(
    // abiQuery: AbiQuery,
    private abiService: AbiService
  ) {}

  ngOnInit() {
    this.abiService.getAbi(this.accountName).then(account => {
      let ricardian = '';
      account.abi.actions.forEach((action) => {
        const parsedRicardian = this.parseContract(action.ricardian_contract);
        ricardian += parsedRicardian;
      });
      if (ricardian) {
        const data = {
          owner: 'Gerry',
          issuer: 'Wolfe',
          ram_payer: 'JOE',
          maximum_supply: '350',
          nowrap: 'NO_WRAP',
          memo: 'G-MEMO',
          quantity: '1000',
          'nowrap quantity': '4,444',
          'asset_to_symbol_code quantity': '15',
          'if memo': true,
          'if transfer': false,
          'memo nowrap': 'No Wrap',
          from: 'Harry',
          to: 'Sally',
          'nowrap from': 'Mike',
          'nowrap to': 'Joshua'
          // '$action.account': 'ACCOUNT' // ????

        };
        const md = new MarkdownIt();
        const mustachedRicardian = Mustache.render(ricardian, data);
        this.ricardianContract = md.render(mustachedRicardian);
      }
    });
  }

  showRicardianModal() {
    this.ricardianDisplay = true;
  }

  parseContract(ricardianSnippet: string): string {
    ricardianSnippet.split('{{/if}}').join('{{/if transfer}}');
    return ricardianSnippet.split('{{/if}}').join('{{/if memo}}');
  }
}
