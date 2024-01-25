import {Component, inject, OnInit} from '@angular/core';
import {AssignmentService} from "../../shared/services/assignment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Assignment} from "../../shared/models/assignment.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Matiere} from "../../shared/models/matiere.model";
import {MatiereService} from "../../shared/services/matiere.service";
import {Location} from "@angular/common";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit{
  assignment: Assignment | null = null;
  matieres: Matiere[] | null = null;

  assignmentFormGroup: FormGroup | null = null;
  constructor(private assignmentService : AssignmentService, private matiereService : MatiereService, private activatedRoute: ActivatedRoute, private location: Location, private authService : AuthService) { }

  ngOnInit(): void {
    this.assignmentService.getAssignment(this.activatedRoute.snapshot.params['id'])
      .subscribe((data) => {
        this.initForm(data);
      });

    this.matiereService.getMatieres().subscribe((data) => {
      this.matieres = data;
    })
  }

  initForm(data : Assignment){
    this.assignmentFormGroup = new FormGroup({
      nom: new FormControl(data.nom, Validators.required),
      dateDeRendu: new FormControl(data.dateDeRendu, Validators.required),
      auteur: new FormControl(data.auteur, Validators.required),
      matiere: new FormControl(data.matiere._id, Validators.required),
      note: new FormControl(data.note),
      remarques: new FormControl(data.remarques),
    });
    this.assignment = data;
  }

  onSubmit(){
    const updatedAssignment : Assignment = {...this.assignment, ...this.assignmentFormGroup!.value};
    if(!updatedAssignment.rendu) updatedAssignment.note = null;
    else updatedAssignment.note = parseInt(this.assignmentFormGroup!.value.note);

    this.assignmentService.updateAssignment(updatedAssignment).subscribe((data) => {
      console.log(data);
      this.location.back();
    });
  }

  onChange(){
    this.assignment!.rendu = this.assignment!.rendu;
  }
}
