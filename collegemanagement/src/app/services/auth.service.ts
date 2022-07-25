import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import { JwtHelperService } from '@auth0/angular-jwt'
import 'rxjs';
import { catchError, throwError } from 'rxjs';

const jwtHelper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any|undefined;
  user: any;

 


  constructor(private http: HttpClient) { }

  registerUser(user:  {
    "name":string,
    "email":string,
    "password": string
 }) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json'
    });
    return this.http.post('https://localhost:7188/api/Auth/register', user, {headers: headers}).pipe(catchError(this.handleError));
  }
 
  authenticateUser(user: { email: string; password: string; }) {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json'
    });
    return this.http.post('https://localhost:7188/api/Auth/login', user, {headers: headers}).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
}

  storeUserData(token: string, user: any) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('admin', user.isAdmin);
    localStorage.setItem('id',user.id)
    this.authToken = token;
    this.user = user;
    // this.admin=this.user.isAdmin;

  }


  getRole(){
    var role=""
    const i= localStorage.getItem('admin')
    if(i=='0'){
      role="admin"
    }
    if(i=='1'){
      role="teacher"
    }
    if(i=='2'){
      role="student"
    }
    return role;
 }

 getId(){
  return localStorage.getItem('id')
 }

  getJwtToken() {
    return localStorage.getItem('id_token');
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    console.log(token)
    this.authToken = token;
    // console.log(this.authToken)
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
