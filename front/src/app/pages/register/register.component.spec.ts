import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect, vitest } from 'vitest';

import { RegisterComponent } from './register.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockAuthService: AuthService;
  let mockRouter: Router;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, HttpClientTestingModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router);
    mockAuthService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check the register form invalid input', () => {
    component.form.controls['username'].setValue('denis');
    expect(component.form.invalid).toEqual(true);
    component.form.controls['email'].setValue('notEmail');
    expect(component.form.invalid).toEqual(true);
    component.form.controls['password'].setValue('&Ast!1234');
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

  it('check register', () => {
    component.form.controls['username'].setValue('denis');
    component.form.controls['password'].setValue('&Test!1234');
    component.form.controls['email'].setValue('denis@gmail.com');
    expect(component.form.invalid).toEqual(false);

    let spyAuthService = vitest.spyOn(mockAuthService, 'register');
    let spyRouter = vitest.spyOn(mockRouter, 'navigate');
    
    component.submit();
    
    const req = httpMock.expectOne('/api/auth/register');
    expect(req.request.method).toBe('POST');

    req.flush({});

    expect(spyAuthService).toHaveBeenCalledTimes(1);
    expect(spyRouter).toHaveBeenCalledTimes(1);
    expect(spyRouter).toHaveBeenCalledWith(['/login']);
    expect(component.onError).toEqual(false);
  });

  it('check register failure', () => {
    const noMessage = document.getElementById('errorMes_register')!;
    expect(noMessage).toBe(null);

    component.form.controls['username'].setValue('ndjanda');
    component.form.controls['password'].setValue('&Test!1234');
    component.form.controls['email'].setValue('denis@gmail.com');
    expect(component.form.invalid).toEqual(false);

    let spyAuthService = vitest.spyOn(mockAuthService, 'register');
    let spyRouter = vitest.spyOn(mockRouter, 'navigate');
    
    component.submit();

    const mockRequest = httpMock.expectOne('/api/auth/register');
    expect(mockRequest.request.method).toBe('POST');

    mockRequest.flush('', {status: 401, statusText: 'Unauthorised!'});

    expect(spyAuthService).toHaveBeenCalledTimes(1);
    expect(spyRouter).toHaveBeenCalledTimes(0);
    expect(component.onError).toEqual(true);

    fixture.detectChanges();
    const errorMessage = document.getElementById('errorMes_register')!;
    expect(errorMessage.textContent).toContain('An error occurred');
  });

});
