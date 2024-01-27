import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AssignmentService } from '../../shared/services/assignment.service';
import { Matiere } from '../../shared/models/matiere.model';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import { MatiereService } from '../../shared/services/matiere.service';
import { AddAssignmentRequest } from '../../shared/models/addAssignmentRequest.model';
import {AuthService} from "../../shared/services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

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
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private _snackBar: MatSnackBar
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
      a.auteur = this.authService.userConnected!._id;

      this.assignmentService.addAssignment(a).subscribe((message) => {
        this._snackBar.open( "Ajout d'assignment réussi !", '',{
          duration: 2000,
        });
        this.dialogRef.close();
      });
    }
  }
}
