import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./authorization/auth.service";

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService) {}
  intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.token;
    // console.log('Request URL: ' + req.url);

    if (token) {
      req = this.addToken(req, token);
    }
    return handler.handle(req);
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
