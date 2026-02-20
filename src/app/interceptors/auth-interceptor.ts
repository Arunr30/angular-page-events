import { HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      orgCode: 'ero',
      appCode: 'pilar',
      apiKey: '846808de-3105-4143-a420-8bedaa601e71',
      identifiertype: 'internal',
      sitecode: 'PILAR',
    },
  });

  return next(modifiedReq);
};
