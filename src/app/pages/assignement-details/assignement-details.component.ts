import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../../shared/services/assignment.service';
import { ActivatedRoute } from '@angular/router';
import { Assignment } from '../../shared/models/assignment.model';

@Component({
  selector: 'app-assignement-details',
  templateUrl: './assignement-details.component.html',
  styleUrls: ['./assignement-details.component.css'],
})
export class AssignementDetailsComponent implements OnInit {
  assignment: Assignment | null = null;

  constructor(
    public assignmentService: AssignmentService,
    public route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.assignmentService
      .getAssignment(this.route.snapshot.paramMap.get('id'))
      .subscribe((assignment) => {
        this.assignment = assignment;
      });
  }

  getNoteStyle(note: number): string {
    if (note < 7) {
      return 'red';
    }
    if (note < 11 && note >= 7) {
      return 'orange';
    }
    if (note >= 11) {
      return 'green';
    }
    return "";
  }
}
