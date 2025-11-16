import {Component, OnInit, signal, viewChild} from '@angular/core';
import {TrainComponentsService} from './services/train-components.service';
import {Button} from 'primeng/button';
import {ManagementViewDialog} from './features/management-view-dialog/management-view-dialog';
import {
  TrainComponentCreateModel,
  TrainComponentModel,
  TrainDataPaginationModel
} from './features/management-view-dialog/models/train-component.model';
import {TableComponent} from './features/table/table';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {UpdateQuantityDialog} from './features/update-quantity-dialog/update-quantity-dialog';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {debounceTime, distinctUntilChanged, Subject} from 'rxjs';

@Component({
  templateUrl: './management-view.html',
  styleUrls: ['./management-view.scss'],
  imports: [
    TableComponent,
    Button,
    ManagementViewDialog,
    ConfirmDialog,
    UpdateQuantityDialog,
    IconField,
    InputIcon,
    InputText
  ],
  providers: [
    TrainComponentsService,
    ConfirmationService
  ]
})
export class ManagementViewComponent implements OnInit {

  // data
  trainComponents = signal<TrainDataPaginationModel | null>(null);
  searchTerm = signal<string>('');
  private searchSubject = new Subject<string>();

  // view children
  dialog = viewChild.required(ManagementViewDialog);
  quantityDialog = viewChild.required(UpdateQuantityDialog);

  // config
  selectedComponentId: number | null = null;

  constructor(
    private trainComponentsService: TrainComponentsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(term => {
      this.searchTerm.set(term);
      this.getTrainComponents();
    });
  }

  ngOnInit(): void {
    this.getTrainComponents();
  }

  getTrainComponents(pageNumber: number = 0, pageSize: number = 10): void {
    this.trainComponentsService.getComponents(pageNumber, pageSize, this.searchTerm()).subscribe({
      next: (data) => this.trainComponents.set(data)
    });
  }

  onSearchChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  clearSearch(): void {
    this.searchTerm.set('');
    this.searchSubject.next('');
    this.getTrainComponents();
  }

  openCreateDialog(): void {
    this.dialog().openForCreate();
  }

  saveComponent(component: TrainComponentCreateModel | null): void {
    if (!component) return;

    const editId = this.dialog().editId();

    if (editId) {
      this.trainComponentsService.updateComponent(editId, component).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Train component updated successfully',
            life: 3000
          });
          this.getTrainComponents();
        }
      });
    } else {
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
      });
    }
  }

  handleEdit(component: TrainComponentModel): void {
    this.dialog().openForEdit(component.id, {
      name: component.name,
      uniqueNumber: component.uniqueNumber,
      canAssignQuantity: component.canAssignQuantity
    });
  }

  handleUpdateQuantity(component: TrainComponentModel): void {
    this.selectedComponentId = component.id;
    this.quantityDialog().setQuantity(component.quantity);
    this.quantityDialog().visibility.set(true);
  }

  updateQuantity(quantity: number | null): void {
    if (this.selectedComponentId && quantity !== null) {
      this.trainComponentsService.updateQuantity(this.selectedComponentId, quantity).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Quantity updated successfully',
            life: 3000
          });
          this.getTrainComponents();
          this.selectedComponentId = null;
        }
      });
    }
  }

  handleDelete(component: TrainComponentModel): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete "${component.name}"?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.trainComponentsService.deleteComponent(component.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Train component deleted successfully',
              life: 3000
            });
            this.getTrainComponents();
          }
        });
      }
    });
  }
}
