import { TestBed } from '@angular/core/testing';
import { expect, vitest, describe, beforeEach, it, afterEach } from 'vitest';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ArticleService } from './article.service';
import { Article } from '../models/article.interface';
import { Theme } from '../models/theme.interface';
import { User } from '../models/user.interface';
import { take } from 'rxjs';
import { ArticlePayload } from '../models/articlePayload.interface';
import { Commentaire } from '../models/commentaire.interface';
import { CommentairePayload } from '../models/commentPayload.interface';

describe('ArticleService', () => {
  let service: ArticleService;
  let httpMock: HttpTestingController;

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

  const mockArticlePayload: ArticlePayload = {
    titre: "Le ruby",
    theme: mockTheme,
    content: "Le content du ruby"
  }
  
  const mockCommentaire: Commentaire ={
    id: 1,
    user: mockUser,
    content: "J'adore cette article",
    date: new Date
  }
  
  const mockCommentairePayload: CommentairePayload ={
    content: "J'adore cette article"
  }

  const mockCommentaires: Commentaire[] = [mockCommentaire];
  const mockArticles: Article[] = [mockArticle];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[ArticleService]
    });
    service = TestBed.inject(ArticleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return article by id', () => {
    service.getById('1').subscribe((article) => expect(article).toEqual(mockArticle));

    const req = httpMock.expectOne('/api/article/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockArticle);
  });

  it('should return all Article of subscribed theme', () => {

    service.getSubscribed().subscribe((sessions) => expect(sessions).toEqual(mockArticles));

    const req = httpMock.expectOne('/api/article/subscribed');
    expect(req.request.method).toBe('GET');
    req.flush(mockArticles);
  });

  it('should create one session', () => {
    service.create(mockArticlePayload).pipe(take(1)).subscribe((session) => expect(session).toBeNull);

    const req = httpMock.expectOne('/api/article');
    expect(req.request.method).toBe('POST');
    req.flush(httpMock);
  });

  it('should create comment', () => {
    service.comment(mockCommentairePayload).pipe(take(1)).subscribe((session) => expect(session).toBeNull);

    const req = httpMock.expectOne('/api/article/comment');
    expect(req.request.method).toBe('POST');
    req.flush(httpMock);
  });

  it('should return article comment', () => {
    service.allComment('1').subscribe((comment) => expect(comment).toEqual(mockCommentaires));

    const req = httpMock.expectOne('/api/article/1/comment');
    expect(req.request.method).toBe('GET');
    req.flush(mockCommentaires);
  });

});
