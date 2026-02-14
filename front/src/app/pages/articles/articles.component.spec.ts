import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect, vitest } from 'vitest';
import { ArticlesComponent } from './articles.component';
import { Theme } from 'src/app/core/models/theme.interface';
import { User } from 'src/app/core/models/user.interface';
import { Article } from 'src/app/core/models/article.interface';
import { of } from 'rxjs';
import { ArticleService } from 'src/app/core/services/article.service';
import { Router } from '@angular/router';

describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;
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

  const mockArticle2: Article = {
    id: 1,
    title: "Le C",
    user: mockUser,
    theme: mockTheme,
    date: new Date,
    content: "Le content de C"
  }

  let mockArticles: Article[] = [mockArticle, mockArticle2];

  const articleServiceMock = {
      getSubscribed: vitest.fn(()=>of(mockArticles))
  }
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlesComponent],
      providers: [
        { provide: ArticleService, useValue: articleServiceMock }
      ]
    }).compileComponents();
    mockRouter = TestBed.inject(Router);
    fixture = TestBed.createComponent(ArticlesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to detail', () => {
    let spyNav = vitest.spyOn(mockRouter, 'navigate');

    component.viewArticleDetail(1);

    expect(spyNav).toBeCalled();
    expect(spyNav).toBeCalledWith(['/article/detail/', 1]);
  });


  it('should go to create', () => {
    let spyNav = vitest.spyOn(mockRouter, 'navigate');

    component.createArticle();

    expect(spyNav).toBeCalled();
    expect(spyNav).toBeCalledWith(['/article/form']);
  });

 
});
