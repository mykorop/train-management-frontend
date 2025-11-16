import {Component, model, ModelSignal} from '@angular/core';
import {Button} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {InputNumber} from 'primeng/inputnumber';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

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
        <div class="flex flex-col gap-2 mb-4">
          <label for="quantity" class="font-semibold">Quantity</label>
          <p-inputNumber 
            id="quantity" 
            class="w-full" 
            formControlName="quantity"
            [showButtons]="true"
            [min]="1"
            [step]="1"
            placeholder="Enter positive integer" />
          @if (form.get('quantity')?.invalid && form.get('quantity')?.touched) {
            <small class="text-red-500">Quantity must be a positive integer</small>
          }
        </div>
      </div>
      <div class="flex justify-end gap-2">
        <p-button label="Cancel" severity="secondary" (onClick)="closeModal()"/>
        <p-button 
          label="Update" 
          [disabled]="form.invalid"
          (onClick)="saveForm()"/>
      </div>
    </p-dialog>
  `
})
export class UpdateQuantityDialog {
  visibility: ModelSignal<boolean> = model<boolean>(false);
  quantity: ModelSignal<number | null> = model<number | null>(null);

  form: FormGroup = new FormGroup({
    quantity: new FormControl<number | null>(1, [
      Validators.required,
      Validators.min(1),
      Validators.pattern('^[0-9]+$')
    ])
  });

  saveForm(): void {
    if (this.form.valid) {
      this.quantity.set(this.form.value.quantity);
      this.closeModal();
    }
  }

  closeModal() {
    this.visibility.set(false);
    this.form.reset({ quantity: 1 });
  }

  setQuantity(value: number | null) {
    this.form.patchValue({ quantity: value || 1 });
    this.form.markAsUntouched();
  }
}

