import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UnauthGuard } from './guard/unauth.guard';
import { AuthGuard } from './guard/auth.guard';
import { ThemeComponent } from './pages/theme/theme.component';
import { FormComponent } from './pages/form/form.component';
import { DetailComponent } from './pages/detail/detail.component';
import { MeComponent } from './pages/me/me.component';
import { ArticleComponent } from './pages/articles/articles.component';

const routes: Routes = [
                        { path: '', canActivate: [UnauthGuard], component: HomeComponent },

                        { path: 'login', canActivate: [UnauthGuard], component: LoginComponent },
                        { path: 'register', canActivate: [UnauthGuard], component: RegisterComponent },

                        { path: 'feed', canActivate: [AuthGuard], children:[
                          { path: 'theme', component: ThemeComponent },
                          { path: 'article',  component: ArticleComponent },]
                        },

                        { path: 'article', canActivate: [AuthGuard], children:[
                          { path: 'form', component: FormComponent },
                          { path: 'detail/:id', component: DetailComponent },]
                        },

                        { path: 'me', canActivate: [AuthGuard], component: MeComponent },

                        { path: '**', redirectTo:''},
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
