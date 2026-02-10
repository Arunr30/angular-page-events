import { HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  

  const modifiedReq = req.clone({
    setHeaders: {
      'Content-Type':'application/json',
      'orgCode': 'try',
      'appCode': 'expfintrack',
      'apiKey': 'eyJraWQiOiJNUUtZMGNhZ1N0Tjl3QXAwTzd3WWZ2MXdTYnVjOFhROHZwbUQ3RXU5b0QwPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhMzY0MjgyMi01MDAxLTcwN2ItZmE1My1hOTVmNDIwYjU1MDkiLCJjb2duaXRvOmdyb3VwcyI6WyJTdXBlcl9BZG1pbiJdLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tXC9ldS1jZW50cmFsLTFfSERyTEdkNDFWIiwiY29nbml0bzp1c2VybmFtZSI6InRyeUBtYWlsaW5hdG9yLmNvbSIsIm9yaWdpbl9qdGkiOiIxYWIxY2ZjZi0xM2MwLTQzZDAtODE2ZS0yZTA5OWYwNDE0OTkiLCJhdWQiOiIzdmo1MG5vMTBndGI4Mm81aWpqMmNkdXZ2MCIsImV2ZW50X2lkIjoiYzc2NjUzMGYtMjFiOC00ZmZkLTg5NWEtMGQ4ZmZmZGM1NjdkIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3NzA2MTQ2MDYsImV4cCI6MTc3MDY5NDk0NiwiaWF0IjoxNzcwNjE0NjA2LCJqdGkiOiJiYjU3YWUxMC1jMGJmLTQ0YmUtODc3Ny00ZGNkNDRiODg4MzQiLCJlbWFpbCI6InRyeUBtYWlsaW5hdG9yLmNvbSJ9.DtJobcOxVmpaB6PDOKhim21Tw2npze240hYzxEq2nKqM9aRXhiPca9rArw1hRVsDiLX8g6cxlVJ6JwKQYcNvONi-S7NeWJYpcZyqHqzcXE6Dgj1kEy7-XoQgWu1Ee-A262KKOx2S3tzYq9wQ9CsqR9vByPFpfa1wJ66nihtryJ7l5vdX7YgUpuusxSoFCoJGJYpdEP7t0C9nVxlYpHZyrmoBq5uGhexoxPOHNX_l_a_BAG0fAI9kSvERXM-moBCE80y0bFU-BQ4asjVOpnPFQTW8CPVIqQiL2NGMYTZCFslpXgp-NnhWNGNYyuDKFZqOY4gpdtyMACpZem6vF_2-ZA',
      'identifiertype': 'external',
      'sitecode': 'DefaultSiteCode'

    }
  })

  return next(modifiedReq);
};
