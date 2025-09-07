import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment.production';

export const authHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const headerName = environment.apiHeader;
  const token = environment.apiToken;

  if (headerName && token) {
    const modifiedReq = req.clone({
      setHeaders: {
        [headerName]: token,
      },
    });
    return next(modifiedReq);
  }

  return next(req);
};
