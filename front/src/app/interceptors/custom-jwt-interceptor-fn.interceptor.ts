import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SessionService } from '../core/services/session.service';

export const customJwtInterceptorFn2Interceptor: HttpInterceptorFn = (req, next) => {

  const sessionService = inject(SessionService);
  if (sessionService.isLogged) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${sessionService.sessionInformation!.token}`,
      },
    });
  }
  return next(req);
};
