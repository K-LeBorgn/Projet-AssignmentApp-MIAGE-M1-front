import { Injectable } from '@angular/core';
import { LoggingService } from './logging.service';
import { Assignment } from '../models/assignment.model';
import { forkJoin, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { bdInitialAssignments } from '../data/data_assignments';
import { bdInitialMatieres } from '../data/data_matieres';
import { AddAssignmentRequest } from '../models/addAssignmentRequest.model';
import { bdInitialEleves } from '../data/data_eleves';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  constructor(
    private loggingService: LoggingService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  url = 'https://projetassignmentmiage-backend.onrender.com/api/assignments';

  getAssignment(id: any): Observable<Assignment> {
    return this.http.get<Assignment>(`${this.url}/${id}`);
  }

  getAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.url);
  }

  getAssignmentsPagine(page: number, limit: number): Observable<any> {
    return this.http.get<Assignment[]>(
      this.url + '?page=' + page + '&limit=' + limit,
    );
  }

  getAssignmentsPagineByName(page: number, limit: number, nom: string): Observable<any> {
    return this.http.get<Assignment[]>(
      this.url + '/search/' + '?page=' + page + '&limit=' + limit + '&name=' + nom,
    );
  }

  addAssignment(assignment: AddAssignmentRequest): Observable<any> {
    return this.http.post<Assignment>(this.url, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    return this.http.put<Assignment>(this.url, assignment,{
      headers: {
        Authorization: `Bearer ${this.authService.accessToken}`
      }
    });
  }

  getAssignmentsRendu(page: number, limit: number): Observable<any> {
    return this.http.get<Assignment[]>(this.url + '/rendu/' + '?page=' + page + '&limit=' + limit);
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    return this.http.delete(this.url + '/' + assignment._id,{
      headers: {
        Authorization: `Bearer ${this.authService.accessToken}`
      }
    });
  }

  peuplerBDavecForkJoin(): Observable<any> {
    let appelsVersAddAssignment: Observable<any>[] = [];

    bdInitialAssignments.forEach((a) => {
      const nouvelAssignment = new AddAssignmentRequest();
      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
      nouvelAssignment.auteur = a.auteur;
      nouvelAssignment.matiere = a.matiere;
      nouvelAssignment.note = a.note;
      nouvelAssignment.remarques = a.remarques;

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });

    /*bdInitialMatieres.forEach(m => {
      const nouveleMatiere = {
        id: m.id,
        nom: m.nom,
        prof: m.prof,
        imageMatiere: m.imageMatiere,
        imageProf: m.imageProf
      };

      appelsVersAddAssignment.push(this.http.post('http://localhost:8010/api/matieres', nouveleMatiere));
    });*/

    /*bdInitialEleves.forEach(e => {
      const nouvelEleve = {
        id: e.id,
        nom: e.nom,
        prenom: e.prenom
      };

      appelsVersAddAssignment.push(this.http.post('http://localhost:8010/api/eleves', nouvelEleve));
    });*/

    return forkJoin(appelsVersAddAssignment);
  }
}
