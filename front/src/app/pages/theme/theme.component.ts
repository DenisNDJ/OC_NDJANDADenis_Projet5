import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Theme } from 'src/app/core/models/theme.interface';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { MaterialModule } from 'src/app/shared/material.module';


@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss',
  imports:[MaterialModule]
})
export class ThemeComponent implements OnInit, OnDestroy{

  private themeService = inject(ThemeService);
  private subscriptionService = inject(SubscriptionService);  
  private destroy$!: Subject<boolean>;
  public theme$!: Observable<Theme[]>;

    
  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.theme$ = this.themeService.all();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public subscribeTheme(theme: Theme):void{
      this.subscriptionService.subscribe(theme.id.toString()).pipe(takeUntil(this.destroy$)).subscribe(_ => theme.subscribed = !theme.subscribed);
  }

}