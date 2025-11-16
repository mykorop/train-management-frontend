import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorTitle = 'Error';
      let errorMessage = 'An unexpected error occurred';
      
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        const errorResponse = error.error;
        
        if (errorResponse?.title && errorResponse?.detail) {
          errorTitle = errorResponse.title;
          errorMessage = errorResponse.detail;
        } else if (errorResponse?.message) {
          errorMessage = errorResponse.message;
        } else if (error.message) {
          errorMessage = error.message;
        } else {
          errorMessage = `Error ${error.status}: ${error.statusText}`;
        }
      }

      messageService.add({
        severity: 'error',
        summary: errorTitle,
        detail: errorMessage,
        life: 5000
      });

      return throwError(() => error);
    })
  );
};

