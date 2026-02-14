import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect, vitest } from 'vitest';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter: Router;
  let authServiceMock: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router);
    authServiceMock = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check the login form invalid input', () => {
    component.form.controls['email'].setValue('notEmail');
    expect(component.form.invalid).toEqual(true);
    component.form.controls['password'].setValue('test!1234');
    expect(component.form.invalid).toEqual(true);
    component.form.controls['email'].setValue('');
    expect(component.form.invalid).toEqual(true);
    component.form.controls['email'].setValue('denis@gmail.com');
    expect(component.form.invalid).toEqual(false);
  });

  it('check back button', () => {
    let spyRouter = vitest.spyOn(mockRouter, 'navigate');
    const backBtn = document.getElementById('backBtn')!;
    backBtn.click();

    
    expect(spyRouter).toHaveBeenCalledTimes(1);
    expect(spyRouter).toHaveBeenCalledWith(['']);
  });

  it('check the login', () => {
    component.form.controls['email'].setValue('denis@gmail.com');
    component.form.controls['password'].setValue('test!1234');
    expect(component.form.invalid).toEqual(false);

    let spyAuthService = vitest.spyOn(authServiceMock, 'login');
    let spyRouter = vitest.spyOn(mockRouter, 'navigate');
    
    component.submit();

    const mockRequest = httpMock.expectOne('/api/auth/login');
    expect(mockRequest.request.method).toBe('POST');

    mockRequest.flush({})

    expect(spyAuthService).toHaveBeenCalledTimes(1);
    expect(spyRouter).toHaveBeenCalledTimes(1);
    expect(spyRouter).toHaveBeenCalledWith(['/feed/article']);
    expect(component.onError).toEqual(false);
  });

  it('check the login failure', () => {
    component.form.controls['email'].setValue('denis@gmail.com');
    component.form.controls['password'].setValue('test!1234');
    expect(component.form.invalid).toEqual(false);

    let spyAuthService = vitest.spyOn(authServiceMock, 'login');
    let spyRouter = vitest.spyOn(mockRouter, 'navigate');
    
    component.submit();

    const mockRequest = httpMock.expectOne('/api/auth/login');
    expect(mockRequest.request.method).toBe('POST');

    mockRequest.flush('', {status: 401, statusText: 'Unauthorised!'});

    expect(spyAuthService).toHaveBeenCalledTimes(1);
    expect(spyRouter).toHaveBeenCalledTimes(0);
    expect(component.onError).toEqual(true);

    fixture.detectChanges();

    const errorMessage = document.getElementById('errorMes_login')!;
    expect(errorMessage.textContent).toContain('An error occurred');
  });
});
