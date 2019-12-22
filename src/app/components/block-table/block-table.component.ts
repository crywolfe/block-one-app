import { Component, OnInit, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DataViewModule } from 'primeng/dataview';
import { EosBlock } from 'src/app/state/models/eos-block.model';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-block-table',
  templateUrl: './block-table.component.html',
  styleUrls: ['./block-table.component.scss']
})
export class BlockTableComponent implements OnInit {
  @Input() eosBlocks;
  loading: boolean;
  faChevronRight = faChevronRight;
  faChevronDown = faChevronDown;

  constructor() {}

  ngOnInit() {
    this.loading = true;
  }

  getActionCount(block: EosBlock): number {
    if (block && block.transactions) {
      return block.transactions.length;
    } else {
      return 0;
    }
  }

  loadData(event) {
    event.first = 0;
    event.rows = 10;
  }
}
