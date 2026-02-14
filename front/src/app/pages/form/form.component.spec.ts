import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect, vitest } from 'vitest';
import { FormComponent } from './form.component';
import { ArticleService } from 'src/app/core/services/article.service';
import { Theme } from 'src/app/core/models/theme.interface';
import { of } from 'rxjs';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { Router } from '@angular/router';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let articleServiceMock: ArticleService;
  let mockRouter: Router;
  
  const mockTheme: Theme = {
    id: 1,
    name: "Le theme du C",
    content: "Le content de theme C",
    subscribed: true
  }

  const subscriptionServiceMock = {
      getByUser: vitest.fn(()=>of([mockTheme])),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormComponent],
      providers: [
        { provide: SubscriptionService, useValue: subscriptionServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    articleServiceMock = TestBed.inject(ArticleService);
    mockRouter = TestBed.inject(Router);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check the article form invalid input', () => {
    component.articleForm.controls['title'].setValue('Le C');
    expect(component.articleForm.invalid).toEqual(true);
    component.articleForm.controls['theme'].setValue(mockTheme);
    expect(component.articleForm.invalid).toEqual(true);
    component.articleForm.controls['content'].setValue('Content Article C');
    expect(component.articleForm.invalid).toEqual(false);
  });

  it('check article creation', () => {
    let spyArticleService = vitest.spyOn(articleServiceMock, 'create');

    component.articleForm.controls['title'].setValue('Le C');
    component.articleForm.controls['theme'].setValue(mockTheme);
    component.articleForm.controls['content'].setValue('Content Article C');
    expect(component.articleForm.invalid).toEqual(false);

    component.submit();

    expect(spyArticleService).toHaveBeenCalledTimes(1);
  });

  it('check back button', () => {
    let spyRouter = vitest.spyOn(mockRouter, 'navigate');
    const backBtn = document.getElementById('backBtn')!;
    backBtn.click();
    
    expect(spyRouter).toHaveBeenCalledTimes(1);
    expect(spyRouter).toHaveBeenCalledWith(['feed/article']);
  });
});
