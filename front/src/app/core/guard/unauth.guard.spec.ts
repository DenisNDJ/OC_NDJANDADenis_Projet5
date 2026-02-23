import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { expect, vitest, describe, beforeEach, it } from 'vitest';
import { SessionService } from '../services/session.service';
import { UnauthGuard } from './unauth.guard';
import { Router } from '@angular/router';

describe('UnAuthGuard', () => {
    let sessionService: SessionService
    let unauthGuard: UnauthGuard;
    let routerMock: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule]
        });
        unauthGuard = TestBed.inject(UnauthGuard);
        sessionService = TestBed.inject(SessionService);
        routerMock = TestBed.inject(Router);
    });

    it('Tester si non connecter', () => {
      
        sessionService.isLogged = false;
        const ret = unauthGuard.canActivate();
        expect(ret).toBe(true);
    })

    it('Tester si connecter', () => {
      const spyNav = vitest.spyOn(routerMock, 'navigate');
      sessionService.isLogged = true;
      const ret = unauthGuard.canActivate();
      expect(ret).toBe(false);
      expect(spyNav).toHaveBeenCalledWith(['article']);
    })
});