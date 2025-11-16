import {Component, model, ModelSignal, signal} from '@angular/core';
import {Button} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {InputText} from 'primeng/inputtext';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TrainComponentCreateFormModel, TrainComponentCreateModel} from './models/train-component.model';
import {Checkbox} from 'primeng/checkbox';

@Component({
  selector: 'management-view-dialog',
  imports: [
    Button,
    Dialog,
    InputText,
    Checkbox,
    ReactiveFormsModule
  ],
  templateUrl: './management-view-dialog.html'
})
export class ManagementViewDialog {

  visibility: ModelSignal<boolean> = model<boolean>(false);
  compData: ModelSignal<TrainComponentCreateModel | null> = model<TrainComponentCreateModel | null>(null);
  editMode = signal<boolean>(false);
  editId = signal<number | null>(null);

  form: FormGroup<TrainComponentCreateFormModel> = new FormGroup({
    name: new FormControl(''),
    uniqueNumber: new FormControl(''),
    canAssignQuantity: new FormControl(false)
  })

  saveForm(): void {
   this.compData.update(_ => this.form.value as TrainComponentCreateModel);
   this.closeModal();
  }

  closeModal() {
    this.visibility.update(_ => false);
    this.editMode.set(false);
    this.editId.set(null);
    this.form.reset();
  }

  openForEdit(id: number, data: TrainComponentCreateModel) {
    this.editMode.set(true);
    this.editId.set(id);
    this.form.patchValue(data);
    this.visibility.set(true);
  }

  openForCreate() {
    this.editMode.set(false);
    this.editId.set(null);
    this.form.reset({ name: '', uniqueNumber: '', canAssignQuantity: false });
    this.visibility.set(true);
  }
}
