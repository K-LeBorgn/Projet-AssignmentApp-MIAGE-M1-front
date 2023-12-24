export class AddAssignmentRequest {
  id!: number;
  nom!: string;
  dateDeRendu!: Date;
  rendu!: boolean;
  auteur!: string;
  matiere!: string;
  note!: number | undefined;
  remarques!: string;
}
