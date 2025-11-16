import {Component, computed, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {TableModule, TablePageEvent} from 'primeng/table';


import {Button} from 'primeng/button';
import {TrainComponentModel, TrainDataPaginationModel} from '../management-view-dialog/models/train-component.model';
import {tableColumnsConfig} from './config/table-columns.config';
import {Tooltip} from 'primeng/tooltip';
import {ParamsModel} from '../../services/models/params.model';

@Component({
  selector: 'table-components',
  templateUrl: './table.html',
  styleUrls: ['./table.scss'],
  imports: [
    TableModule,
    Button,
    Tooltip
  ]
})
export class TableComponent {

  // signals
  data: InputSignal<TrainDataPaginationModel | null> = input.required<TrainDataPaginationModel | null>();

  // outputs
  onEdit = output<TrainComponentModel>();
  onUpdateQuantity = output<TrainComponentModel>();
  onDelete = output<TrainComponentModel>();
  pageChanged = output<ParamsModel>();

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

    this.pageChanged.emit({pageNumber: this.first / this.rows, pageSize: this.rows});
  }

  editComponent(component: TrainComponentModel) {
    this.onEdit.emit(component);
  }

  updateQuantity(component: TrainComponentModel) {
    this.onUpdateQuantity.emit(component);
  }

  deleteComponent(component: TrainComponentModel) {
    this.onDelete.emit(component);
  }
}
