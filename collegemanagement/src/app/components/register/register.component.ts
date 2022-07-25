import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name!: string;
  email!: string;
  password!: string;


  constructor( 
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
    ) { }

  ngOnInit(): void {
  }

  onRegisterSubmit(){
    
    const user={
      name:this.name,
      email:this.email,
      password:this.password
    }

    this.authService.registerUser(user).subscribe((data: any) => {
      if (data.success) {
        this.flashMessagesService.show('You are now registered ,Please wait until your profile verified', { cssClass: 'alert-success', timeout: 5000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessagesService.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/login']);
      }
    });




  }

}
