import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AssignmentService } from '../../shared/services/assignment.service';
import { Matiere } from '../../shared/models/matiere.model';
import { FormControl, Validators } from '@angular/forms';
import { MatiereService } from '../../shared/services/matiere.service';
import { AddAssignmentRequest } from '../../shared/models/addAssignmentRequest.model';

@Component({
  selector: 'app-add-assignment-dialog',
  templateUrl: './add-assignment-dialog.component.html',
  styleUrls: ['./add-assignment-dialog.component.css'],
})
export class AddAssignmentDialogComponent implements OnInit {
  name: string = '';
  date: Date = new Date();
  matieres: Matiere[] = [];
  matiereControl = new FormControl<Matiere | null>(null, Validators.required);
  constructor(
    public dialogRef: MatDialogRef<AddAssignmentDialogComponent>,
    public assignmentService: AssignmentService,
    public matiereService: MatiereService,
  ) {}

  ngOnInit(): void {
    this.matiereService.getMatieres().subscribe((matieres: Matiere[]) => {
      this.matieres = matieres;
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    if (this.name && this.date && this.matiereControl.value) {
      let a = new AddAssignmentRequest();
      a.id = Math.floor(Math.random() * 10000);
      a.nom = this.name;
      if (this.date) a.dateDeRendu = this.date;
      a.rendu = false;

      this.assignmentService.addAssignment(a).subscribe((message) => {
        console.log(message);
        this.dialogRef.close();
      });
    }
  }
}
