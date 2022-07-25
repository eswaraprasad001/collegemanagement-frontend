import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StaffService {

  authToken: any;
  static term: "";

  constructor(private http: HttpClient) { 
    const jwthelper = new JwtHelperService()
  }


  getStaff(id:any){
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authToken
    });
    return this.http.get("https://localhost:7188/api/Staff/GetStaff/"+id,{headers: headers}).pipe(catchError(this.handleError))
  }


  updateStaff(id:any,userData:any){
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authToken
    });
    return this.http.put("https://localhost:7188/api/Staff/UpdateStaffDetails/"+ id,userData,{headers: headers}).pipe(catchError(this.handleError))

  }



  handleError(error: HttpErrorResponse) {
    return throwError(error);
}


  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
}
