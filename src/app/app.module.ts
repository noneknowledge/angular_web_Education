import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { QuizComponent } from './Components/quiz/quiz.component';
import { SpeechComponent } from './Components/speech/speech.component';
import { ScrambledComponent } from './Components/scrambled/scrambled.component';
import { LessionComponent } from './Pages/lession/lession.component';
import { HomeComponent } from './Pages/home/home.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { CommentComponent } from './Components/comment/comment.component';
import { CourseComponent } from './Pages/course/course.component';
import { PageNotFoundComponent } from './Pages/page-not-found/page-not-found.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { BlankfillComponent } from './Components/blankfill/blankfill.component';
import { LessionOutlineComponent } from './Pages/lession-outline/lession-outline.component';
import { LessionInstructionsComponent } from './Pages/lession-instructions/lession-instructions.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { ReadingComponent } from './Components/reading/reading.component';
import { IntervalServerErrorComponent } from './Pages/interval-server-error/interval-server-error.component';
import { TestOutlineComponent } from './Pages/test-outline/test-outline.component';
import { TestComponent } from './Pages/test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    SpeechComponent,
    ScrambledComponent,
    LessionComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CommentComponent,
    CourseComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    BlankfillComponent,
    LessionOutlineComponent,
    LessionInstructionsComponent,
    ProfileComponent,
    ReadingComponent,
    IntervalServerErrorComponent,
    TestOutlineComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
