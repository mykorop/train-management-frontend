import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {
  TrainComponentCreateModel,
  TrainDataPaginationModel
} from '../features/management-view-dialog/models/train-component.model';

@Injectable()
export class TrainComponentsService {

  private apiUrl = environment.serverUrl;

  constructor(private http: HttpClient) {
  }

  getComponents(): Observable<TrainDataPaginationModel> {
    return this.http.get<TrainDataPaginationModel>(`${this.apiUrl}/components`);
  }

  createComponent(component: TrainComponentCreateModel): Observable<TrainComponentCreateModel> {
    return this.http.post<TrainComponentCreateModel>(`${this.apiUrl}/components`, component);
  }
}
