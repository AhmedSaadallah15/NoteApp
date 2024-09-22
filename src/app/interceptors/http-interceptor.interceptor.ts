import { HttpInterceptorFn } from '@angular/common/http';


export const httpInterceptorInterceptor: HttpInterceptorFn = (req, next) => {


let myReq  = req.clone({
    headers: req.headers.set('token', `${'3b8ny__'+ localStorage.getItem('userToken')}`)
  })

  return next(myReq)


};
