import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ArticlePayload } from 'src/app/core/models/articlePayload.interface';
import { Theme } from 'src/app/core/models/theme.interface';
import { ArticleService } from 'src/app/core/services/article.service';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { MaterialModule } from 'src/app/shared/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
    imports:[MaterialModule]
})
export class FormComponent implements OnInit, OnDestroy{
  
  private articleService = inject(ArticleService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private matSnackBar = inject(MatSnackBar);
  private destroy$!: Subject<boolean>;
  public theme$!: Observable<Theme[]>;
  public themeForm!: Theme;
  private subscriptionService = inject(SubscriptionService);
  
  public articleForm = this.fb.group({
    title: [
      '',
      [
        Validators.required
      ]
    ],
    theme: [
      this.themeForm,
      [
        Validators.required
      ]
    ],
    content: [
      '',
      [
        Validators.required,
        Validators.maxLength(254)
      ]
    ]
  });

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.theme$ = this.subscriptionService.getByUser();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  submit():void {
    const articleRequest = this.articleForm.value as ArticlePayload;
    this.articleService
      .create(articleRequest)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: _ => {
          this.matSnackBar.open("Article créé", 'Close', { duration: 3000 });
          this.backtoArticleList();
        },
        error: _ => this.matSnackBar.open("Erreur création", 'Close', { duration: 3000 })
      });
  }

  backtoArticleList():void{
    this.router.navigate(['feed/article']);
  }
}
