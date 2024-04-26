import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './Components/quiz/quiz.component';
import { LessionComponent } from './Pages/lession/lession.component';
import { HomeComponent } from './Pages/home/home.component';
import { CourseComponent } from './Pages/course/course.component';
import { PageNotFoundComponent } from './Pages/page-not-found/page-not-found.component';
import { RegisterComponent } from './Pages/register/register.component';
import { LoginComponent } from './Pages/login/login.component';
import { LessionOutlineComponent } from './Pages/lession-outline/lession-outline.component';
import { LessionInstructionsComponent } from './Pages/lession-instructions/lession-instructions.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { IntervalServerErrorComponent } from './Pages/interval-server-error/interval-server-error.component';
import { TestOutlineComponent } from './Pages/test-outline/test-outline.component';
import { TestComponent } from './Pages/test/test.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'outline/:id', component: LessionOutlineComponent},
  {path: 'instruction/:id', component: LessionInstructionsComponent},
  {path: 'course', component: CourseComponent},
  {path: 'login', component: LoginComponent},
  {path:'testoutline/:id',component:TestOutlineComponent},
  {path:'test/:id/:type/:status',component:TestComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'lession/:id', component: LessionComponent },
  {path: 'interval-error', component: IntervalServerErrorComponent},
  {path: '**', component: PageNotFoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
