import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { expect, vitest, describe, beforeEach, it } from 'vitest';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
    let sessionService: SessionService
    let authGuard: AuthGuard;
    let routerMock: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule]
        });
        authGuard = TestBed.inject(AuthGuard);
        sessionService = TestBed.inject(SessionService);
        routerMock = TestBed.inject(Router);
    });

    it('Tester si connecter', () => {
      
        sessionService.isLogged = true;
        const ret = authGuard.canActivate();
        expect(ret).toBe(true)
    })

    it('Tester si non connecter', () => {
      const spyNav = vitest.spyOn(routerMock, 'navigate');
      sessionService.isLogged = false;
      const ret = authGuard.canActivate();
      expect(ret).toBe(false)
      expect(spyNav).toHaveBeenCalledWith(['login'])
    })
});