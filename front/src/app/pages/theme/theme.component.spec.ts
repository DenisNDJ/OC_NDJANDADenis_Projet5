import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect, vitest } from 'vitest';
import { ThemeComponent } from './theme.component';
import { Theme } from 'src/app/core/models/theme.interface';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { of } from 'rxjs';
import { ThemeService } from 'src/app/core/services/theme.service';
import { By } from '@angular/platform-browser';

describe('ThemeComponent', () => {
  let component: ThemeComponent;
  let fixture: ComponentFixture<ThemeComponent>;

  const mockTheme: Theme = {
    id: 1,
    name: "Le theme du C",
    content: "Le content de theme C",
    subscribed: true
  }

  const mockSubscriptionService = {
      subscribe: vitest.fn(()=>of(null))
  }

  const mockThemeService = {
      all: vitest.fn(()=>of([mockTheme]))
  }
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeComponent],
      providers: [
        { provide: ThemeService, useValue: mockThemeService },
        { provide: SubscriptionService, useValue: mockSubscriptionService }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(ThemeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check back button', () => {
    let spyRouter = vitest.spyOn(mockSubscriptionService, 'subscribe');

    component.subscribeTheme(mockTheme);

    expect(spyRouter).toBeCalled();
    expect(mockTheme.subscribed).toBe(false);
  });
});
