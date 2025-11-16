import {Component, model, ModelSignal} from '@angular/core';
import {Button} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {InputNumber} from 'primeng/inputnumber';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'update-quantity-dialog',
  imports: [
    Button,
    Dialog,
    InputNumber,
    ReactiveFormsModule
  ],
  template: `
    <p-dialog 
      header="Update Quantity" 
      [closable]="false" 
      [modal]="true" 
      [(visible)]="visibility" 
      [style]="{ width: '30rem' }">
      <div [formGroup]="form">
        <div class="flex items-center gap-4 mb-4">
          <label for="quantity" class="font-semibold w-40">Quantity</label>
          <p-inputNumber 
            id="quantity" 
            class="flex-auto" 
            formControlName="quantity"
            [showButtons]="true"
            [min]="0" />
        </div>
      </div>
      <div class="flex justify-end gap-2">
        <p-button label="Cancel" severity="secondary" (onClick)="closeModal()"/>
        <p-button label="Update" (onClick)="saveForm()"/>
      </div>
    </p-dialog>
  `
})
export class UpdateQuantityDialog {
  visibility: ModelSignal<boolean> = model<boolean>(false);
  quantity: ModelSignal<number | null> = model<number | null>(null);

  form: FormGroup = new FormGroup({
    quantity: new FormControl<number | null>(0)
  });

  saveForm(): void {
    this.quantity.set(this.form.value.quantity);
    this.closeModal();
  }

  closeModal() {
    this.visibility.set(false);
  }

  setQuantity(value: number | null) {
    this.form.patchValue({ quantity: value || 0 });
  }
}

