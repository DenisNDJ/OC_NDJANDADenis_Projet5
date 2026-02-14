import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect, vitest } from 'vitest';
import { DetailComponent } from './detail.component';
import { RouterTestingModule } from "@angular/router/testing";
import { of } from 'rxjs';
import { Article } from 'src/app/core/models/article.interface';
import { Theme } from 'src/app/core/models/theme.interface';
import { User } from 'src/app/core/models/user.interface';
import { ArticleService } from 'src/app/core/services/article.service';
import { Commentaire } from 'src/app/core/models/commentaire.interface';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let mockRouter: Router;

  const mockTheme: Theme = {
    id: 1,
    name: "Le theme du C",
    content: "Le content de theme C",
    subscribed: true
  }

  const mockUser: User = {
    id: 1,
    username: "Ndjanda",
    email: "denis@gmail.com",
    password: "test!1234"
  }

  const mockArticle: Article = {
    id: 1,
    title: "Le C",
    user: mockUser,
    theme: mockTheme,
    date: new Date,
    content: "Le content de C"
  }

  const mockCommentaire: Commentaire ={
    id: 1,
    user: mockUser,
    content: "J'adore cette article",
    date: new Date
  }

  const articleServiceMock = {
      getById: vitest.fn(()=>of(mockArticle)),
      allComment: vitest.fn(()=>of([mockCommentaire])),
      comment: vitest.fn(()=>of(null))
  }
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
          DetailComponent,
          RouterTestingModule],
      providers: [
        { provide: ArticleService, useValue: articleServiceMock },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check the article and comment info', () => {
    const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'};

    const titleElement = document.getElementById('title-detail')!;
    const dateElement = document.getElementById('date-detail')!;
    const userElement = document.getElementById('user-detail')!;
    const themeElement = document.getElementById('theme-detail')!;
    const contentElement = document.getElementById('content-detail')!;
    
    const commentUserElement = document.getElementById('commentUser-detail')!;
    const commentContentElement = document.getElementById('commentContent-detail')!;

    expect(titleElement.textContent).toContain(mockArticle.title);
    expect(dateElement.textContent).toContain(mockArticle.date.toLocaleDateString("en-US", options));
    expect(userElement.textContent).toContain(mockArticle.user.username);
    expect(themeElement.textContent).toContain(mockArticle.theme.name);
    expect(contentElement.textContent).toContain(mockArticle.content);
    
    expect(commentUserElement.textContent).toContain(mockCommentaire.user.username);
    expect(commentContentElement.textContent).toContain(mockCommentaire.content);
  });

  it('check the submit', () => {
    let spyArtService = vitest.spyOn(articleServiceMock, 'comment');
    let spyInit = vitest.spyOn(component, 'ngOnInit');

    component.commentForm.controls['content'].setValue('new comment');
   
    component.submit();

    expect(spyArtService).toBeCalledTimes(1);
    expect(spyInit).toBeCalledTimes(1);
  });

  it('check back button', () => {
    let spyRouter = vitest.spyOn(mockRouter, 'navigate');
    const backBtn = document.getElementById('backBtn')!;
    backBtn.click();

    expect(spyRouter).toHaveBeenCalledTimes(1);
    expect(spyRouter).toHaveBeenCalledWith(['feed/article']);
  });
});
