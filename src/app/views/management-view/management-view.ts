import {Component, OnInit, signal} from '@angular/core';
import {TrainComponentsService} from './services/train-components.service';
import {Button} from 'primeng/button';
import {ManagementViewDialog} from './features/management-view-dialog/management-view-dialog';
import {
  TrainComponentCreateModel,
  TrainDataPaginationModel
} from './features/management-view-dialog/models/train-component.model';
import {TableComponent} from './features/table/table';
import {MessageService} from 'primeng/api';

@Component({
  templateUrl: './management-view.html',
  styleUrls: ['./management-view.scss'],
  imports: [
    TableComponent,
    Button,
    ManagementViewDialog
  ],
  providers: [
    TrainComponentsService
  ]
})
export class ManagementViewComponent implements OnInit {

  // data
  trainComponents = signal<TrainDataPaginationModel | null>(null);

  // config
  showModal = false;

  constructor(
    private trainComponentsService: TrainComponentsService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.getTrainComponents();
  }

  getTrainComponents(): void {
    this.trainComponentsService.getComponents().subscribe({
      next: (data) => this.trainComponents.set(data)
    });
  }

  saveComponent(component: TrainComponentCreateModel | null): void {
    if (component) {
      this.trainComponentsService.createComponent(component).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Train component created successfully',
            life: 3000
          });
          this.getTrainComponents();
        }
      })
    }
  }
}
