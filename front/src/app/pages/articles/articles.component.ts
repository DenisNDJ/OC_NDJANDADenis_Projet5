import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Article } from 'src/app/core/models/article.interface';
import { ArticleService } from 'src/app/core/services/article.service';
import { MaterialModule } from 'src/app/shared/material.module';

@Component({
    selector: 'app-article',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.scss'],
    standalone:false
})
export class ArticleComponent implements OnInit {

  private articleService = inject(ArticleService);
  private router = inject(Router);
  public sortIndex: boolean = true;
  public emptyList: boolean = true;

  public article$: Observable<Article[]> = this.articleService.getSubscribed();
  
  ngOnInit(): void {
    this.sort();
  }

  public createArticle():void{
    this.router.navigate(['/article/form']);
  }

  public viewArticleDetail(articleId:number):void{
    this.router.navigate(['/article/detail/', articleId]);
  }

  public sort():void{
      this.article$ = this.article$.pipe(map((data) => {
      data.sort((a, b) => {
          if(this.sortIndex) return a.date < b.date ? -1 : 1;
          else return a.date > b.date ? -1 : 1;});
      return data;
      }))
      this.sortIndex = !this.sortIndex;
  }

}
