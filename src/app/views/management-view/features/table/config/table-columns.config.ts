import {ColumnModel} from '../models/column';

export const tableColumnsConfig: ColumnModel[] = [
  {
    field: 'id',
    header: 'ID'
  },
  {
    field: 'name',
    header: 'Component Name'
  },
  {
    field: 'uniqueNumber',
    header: 'Unique Number'
  },
  {
    field: 'canAssignQuantity',
    header: 'Can Assign Quantity'
  },
  {
    field: 'quantity',
    header: 'Quantity'
  },
  {
    field: 'actions',
    header: 'Actions'
  }
]
