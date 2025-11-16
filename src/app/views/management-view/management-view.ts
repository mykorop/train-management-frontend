import {Component, OnInit} from '@angular/core';
import {TrainComponentsService} from './services/train-components.service';
import {AsyncPipe} from '@angular/common';
import {Button} from 'primeng/button';
import {ManagementViewDialog} from './features/management-view-dialog/management-view-dialog';
import {
  TrainComponentCreateModel,
  TrainDataPaginationModel
} from './features/management-view-dialog/models/train-component.model';
import {TableComponent} from './features/table/table';
import {Observable} from 'rxjs';

@Component({
  templateUrl: './management-view.html',
  styleUrls: ['./management-view.scss'],
  imports: [
    TableComponent,
    AsyncPipe,
    Button,
    ManagementViewDialog
  ],
  providers: [
    TrainComponentsService
  ]
})
export class ManagementViewComponent implements OnInit {

  // data
  trainComponents!: Observable<TrainDataPaginationModel>;

  // config
  showModal = false;

  constructor(private trainComponentsService: TrainComponentsService) {
  }

  ngOnInit(): void {
    this.getTrainComponents();
  }

  getTrainComponents(): void {
    this.trainComponents = this.trainComponentsService.getComponents();
  }

  saveComponent(component: TrainComponentCreateModel | null): void {
    if (component) {
      this.trainComponentsService.createComponent(component).subscribe({
        next: () => {
          this.getTrainComponents();
        }
      })
    }
  }
}
