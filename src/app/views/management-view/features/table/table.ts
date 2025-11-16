import {Component, computed, input, InputSignal} from '@angular/core';
import {TableModule, TablePageEvent} from 'primeng/table';


import {Button} from 'primeng/button';
import {TrainComponentModel, TrainDataPaginationModel} from '../management-view-dialog/models/train-component.model';
import {tableColumnsConfig} from './config/table-columns.config';

@Component({
  selector: 'shared-table',
  templateUrl: './table.html',
  styleUrls: ['./table.scss'],
  imports: [
    TableModule,
    Button
  ]
})
export class TableComponent {

  // signals
  data: InputSignal<TrainDataPaginationModel | null> = input.required<TrainDataPaginationModel | null>();

  // data
  items: TrainComponentModel[] = [];
  first = 0;
  rows = 10;

  computedItems = computed(() => {
    const data = this.data();
    return data ? [...this.items, ...data.items] : this.items
  });

  // config
  readonly tableColumnsConfig = tableColumnsConfig;

  pageChange(event: TablePageEvent) {
    this.first = event.first;
    this.rows = event.rows;
  }
}
