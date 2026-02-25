import { HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      orgCode: 'ero',
      appCode: 'pilar',
      apiKey: 'cc749aae-4093-427e-a727-3be220c611d4',
      identifiertype: 'internal',
      sitecode: 'PILAR',
    },
  });

  return next(modifiedReq);
};
