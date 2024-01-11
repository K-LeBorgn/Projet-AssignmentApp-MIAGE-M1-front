import {AfterViewInit, Component, OnInit} from '@angular/core';
import { AssignmentService } from '../../shared/services/assignment.service';
import { ActivatedRoute } from '@angular/router';
import { Assignment } from '../../shared/models/assignment.model';
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-assignement-details',
  templateUrl: './assignement-details.component.html',
  styleUrls: ['./assignement-details.component.css'],
})
export class AssignementDetailsComponent implements OnInit {
  assignment: Assignment | null = null;
  circleColor: string = '';

  constructor(
    public assignmentService: AssignmentService,
    public route: ActivatedRoute,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.assignmentService
      .getAssignment(this.route.snapshot.paramMap.get('id'))
      .subscribe((assignment) => {
        this.assignment = assignment;
      });
  }

  getNoteStyle(note: number): string {
    this.circleColor = 'background-color: ';
    if (note < 7) {
      this.circleColor += 'red';
      return 'red';
    }
    if (note < 11 && note >= 7) {
      this.circleColor += 'orange';
      return 'orange';
    }
    if (note >= 11) {
      this.circleColor += 'green';
      return 'green';
    }
    return "";
  }
}
