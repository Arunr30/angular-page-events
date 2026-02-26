import { HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      orgCode: 'ero',
      appCode: 'pilar',
      apiKey: 'caf4e01c-980a-4fa1-833c-e0d0a8ee0863',
      identifiertype: 'internal',
      sitecode: 'PILAR',
    },
  });

  return next(modifiedReq);
};
