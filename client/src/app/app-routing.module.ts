import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AddLessonComponent } from './admin/add-lesson/add-lesson.component';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { HomeComponent } from './home/home.component';
import { LessonCategoriesComponent } from './lesson/lesson-categories/lesson-categories.component';
import { LessonComponent } from './lesson/lesson/lesson.component';
import { LessonsComponent } from './lesson/lessons/lessons.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'main', component: MainComponent},
  {path: 'admin-main', component: AdminMainComponent},
  {path: 'account', component: AccountComponent},
  {path: 'add-lesson', component: AddLessonComponent},
  {path: 'lesson', component: LessonComponent},
  {path: 'lessons', component: LessonsComponent},
  {path: 'lesson-categories', component: LessonCategoriesComponent},
  {path: '**', component: HomeComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
