import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {
  TrainComponentCreateModel,
  TrainComponentModel,
  TrainDataPaginationModel
} from '../features/management-view-dialog/models/train-component.model';

@Injectable()
export class TrainComponentsService {

  private apiUrl = environment.serverUrl;

  constructor(private http: HttpClient) {
  }

  getComponents(pageNumber: number, pageSize: number): Observable<TrainDataPaginationModel> {
    return this.http.get<TrainDataPaginationModel>(`${this.apiUrl}/components`, {
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize
      }
    });
  }

  createComponent(component: TrainComponentCreateModel): Observable<TrainComponentModel> {
    return this.http.post<TrainComponentModel>(`${this.apiUrl}/components`, component);
  }

  updateComponent(id: number, component: TrainComponentCreateModel): Observable<TrainComponentModel> {
    return this.http.put<TrainComponentModel>(`${this.apiUrl}/components/${id}`, component);
  }

  updateQuantity(id: number, quantity: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/components/${id}/quantity`, { quantity });
  }

  deleteComponent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/components/${id}`);
  }
}
