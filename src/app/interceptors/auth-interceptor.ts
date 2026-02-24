import { HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      orgCode: 'ero',
      appCode: 'pilar',
      apiKey: 'afdab95a-1779-414b-a219-05ec5273c1d5',
      identifiertype: 'internal',
      sitecode: 'PILAR',
    },
  });

  return next(modifiedReq);
};
