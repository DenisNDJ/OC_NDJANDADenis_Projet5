import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect, vitest, describe, beforeEach, it } from 'vitest';
import { MeComponent } from './me.component';
import { User } from 'src/app/core/models/user.interface';
import { of } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { Theme } from 'src/app/core/models/theme.interface';
import { SessionService } from 'src/app/core/services/session.service';
import { SubscriptionService } from 'src/app/core/services/subscription.service';

describe('MeComponent', () => {
  let component: MeComponent;
  let fixture: ComponentFixture<MeComponent>;

  const mockUser: User = {
    id: 1,
    username: "Ndjanda",
    email: "denis@gmail.com",
    password: "test!1234"
  }

  const mockUser2: User = {
    id: 2,
    username: "Denis",
    email: "ndjanda@gmail.com",
    password: "test!1234"
  }

  const mockTheme: Theme = {
    id: 1,
    name: "Le theme du C",
    content: "Le content de theme C",
    subscribed: true
  }

  const userServiceMock = {
      getById: vitest.fn(()=>of(mockUser)),
      update: vitest.fn(()=>of(mockUser))
  }

  const subscriptionServiceMock = {
      getByUser: vitest.fn(()=>of([mockTheme])),
      unsubscribe: vitest.fn(()=>of({})),
  }

  let sessionServiceMock = {
    sessionInformation: {
      id: 1
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: SessionService, useValue: sessionServiceMock },
        { provide: SubscriptionService, useValue: subscriptionServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check the user info', () => {
    expect(component.userForm?.controls['username'].value).toContain('Ndjanda');
    expect(component.userForm?.controls['email'].value).toContain('denis@gmail.com');
    expect(component.userForm?.controls['password'].value).toContain('');

    component.initForm(mockUser2);

    expect(component.userForm?.controls['username'].value).toContain('Denis');
    expect(component.userForm?.controls['email'].value).toContain('ndjanda@gmail.com');
    expect(component.userForm?.controls['password'].value).toContain('');
  });

  it('check the theme sub button', () => {
    let spySubService = vitest.spyOn(subscriptionServiceMock, 'unsubscribe');
    let spyInit = vitest.spyOn(component, 'ngOnInit');
    const btnElement = document.getElementById('sub-btn')!;

    btnElement.click();
    expect(spySubService).toHaveBeenCalledTimes(1);
    expect(spyInit).toHaveBeenCalledTimes(1);
    expect(spySubService).toBeCalledWith("1");


  });

  it('check the submit', () => {
    let spyUpdate = vitest.spyOn(userServiceMock, 'update');
    let spyInit = vitest.spyOn(component, 'ngOnInit');
    const userPayload = component.userForm?.value as User;

    component.submit();
    
    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(spyInit).toHaveBeenCalledTimes(1);
    expect(spyUpdate).toBeCalledWith(userPayload,"1");
  });
  
});
