import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AssignementDetailsComponent } from './pages/assignement-details/assignement-details.component';
import {authGuard} from "./shared/guards/auth.guard";
import {EditAssignmentComponent} from "./pages/edit-assignment/edit-assignment.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'assignment/:id', component: AssignementDetailsComponent},
  { path: 'assignment/edit/:id', component: EditAssignmentComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
