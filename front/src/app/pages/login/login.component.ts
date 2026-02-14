import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoginRequest } from 'src/app/core/models/loginRequest.interface';
import { SessionInformation } from 'src/app/core/models/sessionInformation.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { SessionService } from 'src/app/core/services/session.service';
import { MaterialModule } from 'src/app/shared/material.module';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports:[MaterialModule]
})
export class LoginComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private sessionService = inject(SessionService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  public hide = true;
  public onError = false;
  private destroy$!: Subject<boolean>;

  public form = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    password: [
      '',
      [
        Validators.required
      ]
    ]
  });
  
  constructor() { }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
  }

  public submit(): void {
    const loginRequest = this.form.value as LoginRequest;
    this.authService.login(loginRequest).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response: SessionInformation) => {
        this.sessionService.logIn(response);
        this.router.navigate(['/feed/article']);
      },
      error: error => this.onError = true,
    });
  }

  public back(): void{
    this.router.navigate(['']);
  }
}
