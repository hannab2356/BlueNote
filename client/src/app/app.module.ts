import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AccountService } from './_services/account.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { ToastrModule } from 'ngx-toastr';
import { AccountComponent } from './account/account.component';
import { AddLessonComponent } from './admin/add-lesson/add-lesson.component';
import { LessonService } from './_services/lesson.service';
import { LessonComponent } from './lesson/lesson/lesson.component';
import { LessonCategoriesComponent } from './lesson/lesson-categories/lesson-categories.component';
import { LessonsComponent } from './lesson/lessons/lessons.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    MainComponent,
    HasRoleDirective,
    AdminMainComponent,
    AccountComponent,
    AddLessonComponent,
    LessonComponent,
    LessonCategoriesComponent,
    LessonsComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    })
  ],
  providers: [
    AccountService,
    LessonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
