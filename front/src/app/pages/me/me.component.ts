import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, Observable, takeUntil } from 'rxjs';
import { Theme } from 'src/app/core/models/theme.interface';
import { User } from 'src/app/core/models/user.interface';
import { SessionService } from 'src/app/core/services/session.service';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { UserService } from 'src/app/core/services/user.service';
import { mePassValidator } from 'src/app/core/validators/valid.validator';
import { MaterialModule } from 'src/app/shared/material.module';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrl: './me.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports:[MaterialModule]
})
export class MeComponent  implements OnInit, OnDestroy{

  private destroy$!: Subject<boolean>;
  public user$!: Observable<User>;
  private sessionService = inject(SessionService);
  private subscriptionService = inject(SubscriptionService);
  private userService = inject(UserService);
  private fb = inject(FormBuilder);
  public userForm: FormGroup | undefined;
  public theme$!: Observable<Theme[]>;

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.userService.getById(this.sessionService.sessionInformation!.id.toString())
        .pipe(takeUntil(this.destroy$))
        .subscribe((user: User) => this.initForm(user));
        
    this.theme$ = this.subscriptionService.getByUser();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  submit() {
    const userPayload = this.userForm?.value as User;

    this.userService
      .update(userPayload, this.sessionService.sessionInformation!.id.toString())
      .pipe(takeUntil(this.destroy$))
      .subscribe(_ => {
        this.ngOnInit();
      });
  }

  initForm(user: User){
    this.userForm = this.fb.group({
      username: [user.username],
      email: [user.email],
      password: ['',[mePassValidator()]]
    });
  }

  public subscribeTheme(idTheme: number):void{
      this.subscriptionService.unsubscribe(idTheme.toString()).pipe(takeUntil(this.destroy$)).subscribe(_ => this.ngOnInit());
  }
}
