import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AddAssignmentDialogComponent } from '../../components/add-assignment-dialog/add-assignment-dialog.component';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { AssignmentService } from '../../shared/services/assignment.service';
import { Assignment } from '../../shared/models/assignment.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private router: Router,
    private assignmentsService: AssignmentService,
    public dialog: MatDialog,
  ) {}

  assignments!: Assignment[];
  page: number = 1;
  limit: number = 5;
  totalDocs: number = 0;
  totalPages: number = 0;
  hasPrevPage: boolean = false;
  prevPage: number = 0;
  hasNextPage: boolean = false;
  nextPage: number = 0;
  displayedColumns: string[] = [
    'nom',
    'rendu',
    'dateDeRendu',
    'matiere',
    'auteur',
    'note',
  ];
  assignmentName: string = '';
  getByName: boolean = false;

  actualLimit: number = 5;

  @ViewChild(MatSort) sort: MatSort | null = null;
  dataSource: MatTableDataSource<Assignment> | null = null;

  getDetails(a: Assignment) {
    this.router.navigate(['/assignment', a.id]);
  }

  resetFilter() {
    this.getAssignments(1, this.actualLimit);
    this.assignmentName = '';
    this.getByName = false;
  }

  ngOnInit(): void {
    this.getAssignments(this.page, this.limit);
  }

  getAssignments(page: number, limit: number) {
    this.assignmentsService
      .getAssignmentsPagine(page, limit)
      .subscribe((data) => {
        this.assignments = data.docs;
        this.page = data.page;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;

        this.dataSource = new MatTableDataSource<Assignment>(this.assignments);
        this.dataSource.sort = this.sort;
      });
  }

  getAssignmentsByName(page: number, limit: number) {
    this.assignmentsService
      .getAssignmentsPagineByName(page, limit, this.assignmentName)
      .subscribe((data) => {
        this.assignments = data.docs;
        this.page = data.page;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;

        this.dataSource = new MatTableDataSource<Assignment>(this.assignments);
        this.dataSource.sort = this.sort;

        this.getByName = true;
      });
  }

  getAssignmentsRendu() {
    this.assignmentsService.getAssignmentsRendu(this.page, this.actualLimit).subscribe((data) => {
      this.assignments = data.docs;

      this.dataSource = new MatTableDataSource<Assignment>(this.assignments);
      this.dataSource.sort = this.sort;
    });
  }

  peuplerBD() {
    this.assignmentsService.peuplerBDavecForkJoin().subscribe(() => {
      //console.log("LA BD A ETE PEUPLEE, TOUS LES ASSIGNMENTS AJOUTES, ON RE-AFFICHE LA LISTE");
      window.location.reload();
    });
  }

  handlePageEvent(event: any) {
    //console.log(event.pageIndex + 1, event.pageSize);
    this.actualLimit = event.pageSize;
    if(this.getByName){
      this.getAssignmentsByName(event.pageIndex + 1, event.pageSize);
    }
    else {
      this.getAssignments(event.pageIndex + 1, event.pageSize)
    }
  }

  onCheckBoxChange(event: any) {
    if (event.checked) {
      this.getAssignmentsRendu();
    } else {
      this.getAssignments(this.page, this.actualLimit);
    }
  }

  openAddAssignementDialog(): void {
    this.dialog.open(AddAssignmentDialogComponent, {
      width: '700px',
    });
  }
}
