import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { AsideComponent } from './aside/aside.component';
import { HeaderComponent } from './header/header.component';
import { SummaryComponent } from './summary/summary.component';
import { BoardComponent } from './board/board.component';
import { ContactsComponent } from './contacts/contacts.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { HeadlineComponent } from './headline/headline.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { QuestionComponent } from './question/question.component';
import { PrivatcyComponent } from './privatcy/privatcy.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { AddContactSlideComponent } from './add-contact-slide/add-contact-slide.component';
import { EditContactSlideComponent } from './edit-contact-slide/edit-contact-slide.component';


@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    AsideComponent,
    HeaderComponent,
    SummaryComponent,
    BoardComponent,
    ContactsComponent,
    LegalNoticeComponent,
    LoginComponent,
    HeadlineComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    QuestionComponent,
    PrivatcyComponent,
    TaskCardComponent,
    AddContactSlideComponent,
    EditContactSlideComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DragDropModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
