import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Article } from 'src/app/core/models/article.interface';
import { Commentaire } from 'src/app/core/models/commentaire.interface';
import { CommentairePayload } from 'src/app/core/models/commentPayload.interface';
import { ArticleService } from 'src/app/core/services/article.service';
import { SessionService } from 'src/app/core/services/session.service';
import { MaterialModule } from 'src/app/shared/material.module';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  standalone:false
})
export class DetailComponent implements OnInit, OnDestroy{

  private destroy$!: Subject<boolean>;
  public article$!: Observable<Article>;
  private route = inject(ActivatedRoute);
  private articleService = inject(ArticleService);
  private sessionService = inject(SessionService);
  private router = inject(Router);

  private fb = inject(FormBuilder);
  article: Article | undefined;
  public comment$!: Observable<Commentaire[]>;

  public commentForm = this.fb.group({
    content: [
      '',
      [
        Validators.required,
        Validators.max(254)
      ]
    ],});

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.articleService.getById(this.route.snapshot.paramMap.get('id')!)
                        .pipe(takeUntil(this.destroy$))
                        .subscribe((article: Article) => this.article = article);
    this.comment$ = this.articleService.allComment(this.route.snapshot.paramMap.get('id')!);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  submit() {
    let commentairePayload = this.commentForm?.value as CommentairePayload;
    
    commentairePayload.article = this.article;
    commentairePayload.user = this.sessionService.sessionInformation?.id;

    this.articleService.comment(commentairePayload).pipe(takeUntil(this.destroy$)).subscribe(_ => this.ngOnInit());
  }

  backtoArticleList():void{
    this.router.navigate(['feed/article']);
  }

}
