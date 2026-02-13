import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { RegisterRequest } from 'src/app/core/models/registerRequest.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { authValidator } from 'src/app/core/validators/valid.validator';
import { MaterialModule } from 'src/app/shared/material.module';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone:false
})
export class RegisterComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroy$!: Subject<boolean>;
  public onError = false;
  private fb = inject(FormBuilder);
  public hide = true;

  public form = this.fb.group({
    username: [
      '',
      [
        Validators.required,
      ]
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.min(8),
        authValidator(),
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
    const registerRequest = this.form.value as RegisterRequest;
    this.authService.register(registerRequest).pipe(takeUntil(this.destroy$)).subscribe({
        next: (_: void) => this.router.navigate(['/login']),
        error: _ => this.onError = true,
      }
    );
  }

  public back(): void{
    this.router.navigate(['']);
  }

}
