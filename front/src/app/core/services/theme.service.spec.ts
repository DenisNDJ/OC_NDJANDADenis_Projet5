import { TestBed } from '@angular/core/testing';
import { expect, vitest, describe, beforeEach, it, afterEach } from 'vitest';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ArticleService } from './article.service';
import { Theme } from '../models/theme.interface';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
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
    service = TestBed.inject(ThemeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all Theme', () => {

    service.all().subscribe((themes) => expect(themes).toEqual(mockThemes));

    const req = httpMock.expectOne('/api/theme');
    expect(req.request.method).toBe('GET');
    req.flush(mockThemes);
  });

});
