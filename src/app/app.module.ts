import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from "@angular/material/tabs";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from "@angular/forms";
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {CdkScrollableModule} from '@angular/cdk/scrolling';


//navigation
import {
	IgxButtonModule,
	IgxIconModule,
	IgxLayoutModule,
	IgxNavigationDrawerModule,
	IgxRadioModule,
	IgxRippleModule,
	IgxSwitchModule,
	IgxToggleModule
 } from "igniteui-angular";


// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home/home.component';
;
import { TaskCreateComponent, ExampleHeader } from './tasks/task-create/task-create.component';
import { TaskListComponent } from './tasks/task-card/task-card.component';
import { StatusType } from './tasks/task.model';



@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatTabsModule, MatFormFieldModule, MatInputModule, MatSidenavModule, MatDialogModule, MatDatepickerModule,
    MatNativeDateModule, MatButtonToggleModule, MatCardModule, MatIconModule, MatExpansionModule,
    FormsModule,
    BrowserAnimationsModule,
    IgxButtonModule, IgxIconModule, IgxLayoutModule, IgxNavigationDrawerModule,
    IgxRadioModule,	IgxRippleModule, IgxSwitchModule,	IgxToggleModule,
    CdkScrollableModule
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    TaskCreateComponent,
    TaskListComponent,
    ExampleHeader,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
;
