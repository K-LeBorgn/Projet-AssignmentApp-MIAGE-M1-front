import { Injectable } from '@angular/core';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Matiere } from '../models/matiere.model';

@Injectable({
  providedIn: 'root',
})
export class MatiereService {
  constructor(
    private loggingService: LoggingService,
    private http: HttpClient,
  ) {}

  url = 'http://localhost:8010/api/matieres';

  getMatieres(): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.url);
  }
}
