import {FormControl} from '@angular/forms';

export interface TrainDataPaginationModel {
  items: TrainComponentModel[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface TrainComponentModel {
  id: number;
  name: string;
  uniqueNumber: string;
  canAssignQuantity: boolean;
  quantity: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface TrainComponentCreateModel {
  name: string;
  uniqueNumber: string;
  canAssignQuantity: boolean;
}

export interface TrainComponentCreateFormModel {
  name: FormControl<string | null>;
  uniqueNumber: FormControl<string | null>;
  canAssignQuantity: FormControl<boolean | null>;
}
