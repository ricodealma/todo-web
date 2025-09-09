import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY } from 'rxjs';

const statusCodeMessages: { [key: string | number]: string } = {
  0: 'Ocorreu um erro, por favor tente novamente mais tarde.',
  500: 'Ocorreu um erro, por favor tente novamente mais tarde.',
  405: 'Ocorreu um erro, por favor tente novamente mais tarde.',
};

export const errorHandleInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const toastrService = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const responseErrors: string = error?.error.message ?? error?.status;

      const errorMessage = statusCodeMessages[error.status];

      if (errorMessage) {
        toastrService.error(errorMessage);
        return EMPTY;
      }
      toastrService.error(responseErrors);
      console.log(error);
      return EMPTY;
    })
  );
};
