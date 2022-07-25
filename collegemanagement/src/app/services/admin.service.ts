import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  authToken: any;
  static term: "";

  constructor(private http: HttpClient) {
    const jwthelper = new JwtHelperService()
   }

  getAllStaffs() {

    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authToken
    });
    return this.http.get("https://localhost:7188/api/Admin/GetAllStaffs",{headers: headers})
  }

  getAllStudents() {

    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authToken
    });
    return this.http.get("https://localhost:7188/api/Admin/GetAllStudents",{headers: headers})
  }


  updateUser(id:any,userData:any){
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authToken
    });
    return this.http.put("https://localhost:7188/api/Admin/UpdateUser/"+ id,userData,{headers: headers})

  }

  getAllUsers() {

    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authToken
    });
    return this.http.get("https://localhost:7188/api/Admin/GetAllUsers",{headers: headers})
  }

  addStaff(staff:any){
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authToken
    });
    return this.http.post("https://localhost:7188/api/Admin/AddStaff",staff,{headers: headers});
  }

  addStudent(student:any){
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authToken
    });
    return this.http.post("https://localhost:7188/api/Admin/AddStudent",student,{headers: headers});
  }

  getStaff(id:any){
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authToken
    });
    return this.http.get("https://localhost:7188/api/Staff/GetStaff/"+id,{headers: headers})
  }

  getStudent(id:any){
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authToken
    });
    return this.http.get("https://localhost:7188/api/Staff/GetStudent/"+id,{headers: headers})
  }

  getUser(id:any){
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authToken
    });
    return this.http.get("https://localhost:7188/api/Admin/GetUser/"+id,{headers: headers})
  }

  deleteUser(id: any) {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authToken
    });
    return this.http.delete("https://localhost:7188/api/Admin/DeleteUser/" + id,{headers: headers});
  }
  


  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
}
