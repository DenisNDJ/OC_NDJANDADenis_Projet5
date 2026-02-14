import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect, vitest, describe, beforeEach, it } from 'vitest';
import { HomeComponent } from './home.component';
import { Router } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let routerMock: Router;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent]
    }).compileComponents();
    routerMock = TestBed.inject(Router);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to login', () => {
    let spyNav = vitest.spyOn(routerMock, 'navigate');
    const button = document.getElementById('login-btn-home');
    button?.click();
    expect(spyNav).toHaveBeenCalledWith(['/login']);
  });

  it('should go to register', () => {
    let spyNav = vitest.spyOn(routerMock, 'navigate');
    const button = document.getElementById('register-btn-home');
    button?.click();
    expect(spyNav).toHaveBeenCalledWith(['/register']);
  });
});
