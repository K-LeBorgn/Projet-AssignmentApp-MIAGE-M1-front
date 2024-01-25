import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AddAssignmentDialogComponent } from './components/add-assignment-dialog/add-assignment-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { provideHttpClient } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import localeFr from '@angular/common/locales/fr';
import {NgOptimizedImage, registerLocaleData} from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { AssignementDetailsComponent } from './pages/assignement-details/assignement-details.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatStepperModule} from "@angular/material/stepper";
import { EditAssignmentComponent } from './pages/edit-assignment/edit-assignment.component';

registerLocaleData(localeFr, 'fr');
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AddAssignmentDialogComponent,
    AssignementDetailsComponent,
    EditAssignmentComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatListModule,
        MatButtonModule,
        MatPaginatorModule,
        MatInputModule,
        MatDialogModule,
        FormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatTableModule,
        MatSortModule,
        MatCardModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        NgOptimizedImage,
        MatStepperModule,
    ],
  providers: [provideHttpClient(), { provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
