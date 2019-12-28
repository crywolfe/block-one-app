import {Component, OnInit, Input} from '@angular/core';
import {AbiService} from 'src/app/state/services/abi/abi.service';
import * as MarkdownIt from 'markdown-it';
import * as Mustache from 'mustache';
import {GetAbiResult} from 'eosjs/dist/eosjs-rpc-interfaces';

@Component({
  selector: 'app-ricardian-contract',
  templateUrl: './ricardian-contract.component.html',
  styleUrls: ['./ricardian-contract.component.scss']
})
export class RicardianContractComponent implements OnInit {
  @Input() accountName: string;
  actionsLength: number;
  ricardianContract: string;
  ricardianDisplay = false;

  constructor(private abiService: AbiService) {}

  ngOnInit() {
    this.abiService.getAbi(this.accountName).then((account: GetAbiResult) => {
      let ricardian = '';
      this.actionsLength = account.abi.actions.length;
      account.abi.actions.forEach((action) => {
        ricardian = '';
        if (action.ricardian_contract) {
          ricardian += action.name + '\n';
          const parsedRicardian = this.parseContract(action.ricardian_contract);
          ricardian += parsedRicardian;
        }
      });
      if (account.abi.ricardian_clauses.length > 0) {
        account.abi.ricardian_clauses.forEach((clause) => {
          ricardian += clause.id + '\n' + clause.body;
        });
      }
      if (ricardian) {
        // Demo Data
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
          // '$action.account': 'ACCOUNT' // Not sure how this should play with Mustache
        };
        const md = new MarkdownIt();
        const mustachedRicardian = Mustache.render(ricardian, data);
        this.ricardianContract = md.render(mustachedRicardian);
      }
    });
  }

  showRicardianModal(): void {
    this.ricardianDisplay = true;
  }

  parseContract(ricardianSnippet: string): string {
    ricardianSnippet.split('{{/if}}').join('{{/if transfer}}');
    return ricardianSnippet.split('{{/if}}').join('{{/if memo}}');
  }
}
