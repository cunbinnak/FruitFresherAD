import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler,HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable, observable } from "rxjs";


@Injectable()
export class configinterceptor implements HttpInterceptor{

    
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let autheReq = request;
        const token :string | null= sessionStorage.getItem('token');
        if(token !=null){
            autheReq = request.clone({ headers: request.headers.set('Authorization','Bearer ' + token) })
        }
        return next.handle(autheReq);
    }
    
}
export const authInterceptorProvider =[{
    provide:HTTP_INTERCEPTORS, useClass:configinterceptor, multi:true
}];