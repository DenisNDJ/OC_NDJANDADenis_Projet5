import { TestBed } from '@angular/core/testing';
import { expect, describe, beforeEach, it } from 'vitest';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ArticleService } from './article.service';
import { take } from 'rxjs';
import { AuthService } from './auth.service';
import { LoginRequest } from '../models/loginRequest.interface';
import { SessionInformation } from '../models/sessionInformation.interface';
import { RegisterRequest } from '../models/registerRequest.interface';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const mockLoginRequest: LoginRequest ={
    email: "denis@gmail.com",
    password: "test!1234"
  }

  const mockRegisterRequest: RegisterRequest ={
    username: "ndjanda",
    email: "denis@gmail.com",
    password: "test!1234"
  }

  const mockSessionInformation: SessionInformation ={
    id: 1,
    username: "ndjanda",
    email: "denis@gmail.com",
    token: "token"
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[ArticleService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login', () => {
    service.login(mockLoginRequest).pipe(take(1)).subscribe((sessionInfo) => expect(sessionInfo).toBe(mockSessionInformation));

    const req = httpMock.expectOne('/api/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockSessionInformation);
  });

  it('should register', () => {
    service.register(mockRegisterRequest).pipe(take(1)).subscribe((sessionInfo) => expect(sessionInfo).toBeNull);

    const req = httpMock.expectOne('/api/auth/register');
    expect(req.request.method).toBe('POST');
  });

});
