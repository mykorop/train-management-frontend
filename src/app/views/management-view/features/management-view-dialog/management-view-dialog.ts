import {Component, model, ModelSignal} from '@angular/core';
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
  }
}
