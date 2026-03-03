import { HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      orgCode: 'ero',
      appCode: 'pilar',
      apiKey: '4811c81f-ae0e-4d36-b710-e27df431fcd8',
      identifiertype: 'internal',
      sitecode: 'PILAR',
    },
  });

  return next(modifiedReq);
};





// get owner id and ds name