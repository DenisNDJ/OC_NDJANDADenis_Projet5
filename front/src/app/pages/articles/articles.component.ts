import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Article } from 'src/app/core/models/article.interface';
import { ArticleService } from 'src/app/core/services/article.service';
import { MaterialModule } from 'src/app/shared/material.module';
import { CustomDatePipePipe } from "../../shared/customPipe/custom-date-pipe.pipe";

@Component({
    selector: 'app-article',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.scss'],
  imports: [MaterialModule, CustomDatePipePipe]
})
export class ArticlesComponent implements OnInit {

  private articleService = inject(ArticleService);
  private router = inject(Router);
  public sortIndex: boolean = false;

  public article$!: Observable<Article[]>;
  
  ngOnInit(): void {
    this.article$ = this.articleService.getSubscribed();
    this.sort();
  }

  public createArticle():void{
    this.router.navigate(['/article/form']);
  }

  public viewArticleDetail(articleId:number):void{
    this.router.navigate(['/article/detail/', articleId]);
  }

  public sort():void{
      if (this.sortIndex) this.article$ = this.article$.pipe(
        map(article =>
          article.sort(
            (a, b) => Date.parse(a.date.toString()) - Date.parse(b.date.toString())
        )));

      if (!this.sortIndex) this.article$ = this.article$.pipe(
        map(article =>
          article.sort(
            (a, b) => Date.parse(b.date.toString()) - Date.parse(a.date.toString())
        )));
      this.sortIndex = !this.sortIndex;
  }



}
