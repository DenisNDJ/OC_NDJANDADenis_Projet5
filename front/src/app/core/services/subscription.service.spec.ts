import { TestBed } from '@angular/core/testing';
import { expect, vitest, describe, beforeEach, it, afterEach } from 'vitest';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ArticleService } from './article.service';
import { Theme } from '../models/theme.interface';
import { take } from 'rxjs';
import { SubscriptionService } from './subscription.service';

describe('SubscriptionService', () => {
  let service: SubscriptionService;
  let httpMock: HttpTestingController;

  const mockTheme: Theme = {
    id: 1,
    name: "Le theme du C",
    content: "Le content de theme C",
    subscribed: true
  }

  const mockThemes: Theme[] = [mockTheme];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[ArticleService]
    });
    service = TestBed.inject(SubscriptionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return sub theme list for user', () => {
    service.getByUser().subscribe((theme) => expect(theme).toEqual(mockThemes));

    const req = httpMock.expectOne('/api/sub/user');
    expect(req.request.method).toBe('GET');
    req.flush(mockThemes);
  });

  it('should sub', () => {
    service.subscribe("1").pipe(take(1)).subscribe((theme) => expect(theme).toBeNull);

    const req = httpMock.expectOne('/api/sub/1');
    expect(req.request.method).toBe('POST');
  });

  it('should UnSub', () => {
    service.unsubscribe("1").pipe(take(1)).subscribe((theme) => expect(theme).toBeNull);

    const req = httpMock.expectOne('/api/sub/1');
    expect(req.request.method).toBe('DELETE');
  });
});
