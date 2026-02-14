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
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
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
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user by id', () => {
    service.getById('1').subscribe((user) => expect(user).toEqual(mockUser));

    const req = httpMock.expectOne('/api/user/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should create one session', () => {
    service.update(mockUser, "1").pipe(take(1)).subscribe((user) => expect(user).toEqual(mockUser));

    const req = httpMock.expectOne('/api/user/1');
    expect(req.request.method).toBe('PUT');
    req.flush(mockUser);
  });

});
