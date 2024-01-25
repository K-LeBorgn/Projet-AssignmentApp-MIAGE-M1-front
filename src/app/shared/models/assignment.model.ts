import { Matiere } from './matiere.model';
import { User } from './user.model';

export class Assignment {
  _id?: string;
  id!: number;
  nom!: string;
  dateDeRendu!: Date;
  rendu!: boolean;
  auteur!: User;
  matiere!: Matiere;
  note!: number | null;
  remarques!: string;
}
