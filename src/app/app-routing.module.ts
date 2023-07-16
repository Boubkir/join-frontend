import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { SummaryComponent } from './summary/summary.component';
import { BoardComponent } from './board/board.component';
import { ContactsComponent } from './contacts/contacts.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { QuestionComponent } from './question/question.component';
import { PrivatcyComponent } from './privatcy/privatcy.component';
import { NoAuthGuard } from './no-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'summary', component: SummaryComponent, canActivate: [AuthGuard] },
  { path: 'board', component: BoardComponent, canActivate: [AuthGuard] },
  { path: 'add-task', component: AddTaskComponent, canActivate: [AuthGuard] },
  { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard] },
  {
    path: 'legal-notice',
    component: LegalNoticeComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [NoAuthGuard],
  },
  { path: 'help', component: QuestionComponent, canActivate: [AuthGuard] },
  { path: 'privacy', component: PrivatcyComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
