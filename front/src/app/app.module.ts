import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MaterialModule } from './shared/material.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ThemeComponent } from './pages/theme/theme.component';
import { FormComponent } from './pages/form/form.component';
import { DetailComponent } from './pages/detail/detail.component';
import { MeComponent } from './pages/me/me.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ArticlesComponent } from './pages/articles/articles.component';
import { customJwtInterceptorFn2Interceptor } from './core/interceptors/custom-jwt-interceptor-fn.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    ArticlesComponent,
    HomeComponent,
    FormComponent,
    ThemeComponent,
    LoginComponent,
    RegisterComponent,
    DetailComponent,
    MeComponent,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatGridListModule,
  ],
  providers: [provideHttpClient(withInterceptors([customJwtInterceptorFn2Interceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule {}
