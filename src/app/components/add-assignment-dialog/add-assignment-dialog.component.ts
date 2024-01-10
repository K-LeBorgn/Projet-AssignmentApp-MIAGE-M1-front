import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AssignmentService } from '../../shared/services/assignment.service';
import { Matiere } from '../../shared/models/matiere.model';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import { MatiereService } from '../../shared/services/matiere.service';
import { AddAssignmentRequest } from '../../shared/models/addAssignmentRequest.model';

@Component({
  selector: 'app-add-assignment-dialog',
  templateUrl: './add-assignment-dialog.component.html',
  styleUrls: ['./add-assignment-dialog.component.css'],
})
export class AddAssignmentDialogComponent implements OnInit {
  matieres: Matiere[] = [];

  firstFormGroup = this._formBuilder.group({
    nameCtrl: ['', Validators.required],
    dateCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    matiereCtrl: ['', Validators.required]
  });
  constructor(
    public dialogRef: MatDialogRef<AddAssignmentDialogComponent>,
    public assignmentService: AssignmentService,
    public matiereService: MatiereService,
    private _formBuilder: FormBuilder
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
    const matiere = this.secondFormGroup.value.matiereCtrl;
    const name = this.firstFormGroup.value.nameCtrl;
    const date = this.firstFormGroup.value.dateCtrl;
    if (name && date && matiere) {
      let a = new AddAssignmentRequest();
      a.id = Math.floor(Math.random() * 10) * 10000;
      a.nom = name;
      a.dateDeRendu = new Date(date);
      a.rendu = false;
      a.matiere = matiere;
      //a.auteur = ;
      a.auteur = '658456dc977bb51a7e8f3b80';

      this.assignmentService.addAssignment(a).subscribe((message) => {
        console.log(message);
        this.dialogRef.close();
      });
    }
  }
}
