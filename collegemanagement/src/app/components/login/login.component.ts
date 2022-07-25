import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FlashMessagesService} from "angular2-flash-messages";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email!: string;
  password!: string;

  constructor( private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit(): void {
  }

  onLoginSubmit() {
    console.log("first")
    const user = {
      email: this.email,
      password: this.password
    };
    console.log("first1")
    this.authService.authenticateUser(user).subscribe((data: any) => {
      console.log("first2")
      if (data.success) {
        console.log(data.user.status)
        if(data.user.status!="1"){
          this.flashMessagesService.show('Please verify through the email', {cssClass: 'alert-danger', timeout: 3000});
        }
        else{
        if(data.user.isadmin=="0"){
          this.authService.storeUserData(data.token, data.user);
          this.flashMessagesService.show('You are now logged in as Admin', {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate(['admin']);
        }
        if(data.user.isadmin=="1"){
          this.authService.storeUserData(data.token, data.user);
          this.flashMessagesService.show('You are now logged in as Admin', {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate(['staff']);
        }
        if(data.user.isadmin=="2"){
        this.authService.storeUserData(data.token, data.user);
        this.flashMessagesService.show('You are now logged in', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['student']);
      }
      }
    } else {
        this.flashMessagesService.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['login']);
      }
    },(error:any) => {
      this.flashMessagesService.show(error.error, {cssClass: 'alert-danger', timeout: 3000});
    })
  }

}



// ,(error: { error: any; }) => {
//   alert(error.error)
// }

// You are now logged in as Admin
// You are now logged in
// student-view works!