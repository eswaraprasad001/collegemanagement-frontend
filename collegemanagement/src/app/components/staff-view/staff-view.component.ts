import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StaffService } from 'src/app/services/staff.service';
import { FlashMessagesService} from "angular2-flash-messages";
import { Router } from "@angular/router";
@Component({
  selector: 'app-staff-view',
  templateUrl: './staff-view.component.html',
  styleUrls: ['./staff-view.component.css']
})
export class StaffViewComponent implements OnInit {

  currentStaff!:any
  stream: any;
  staffname: any;
  doj: any;
  address: any;
  designation: any;
  staffid: any;
  updateDisplay: boolean | undefined;
  constructor(private auth:AuthService,
    private staff:StaffService,
    private flashMessagesService:FlashMessagesService,
    private router:Router) { }

  ngOnInit(): void {
    var sid=this.auth.getId()
    console.log(sid)
    this.staff.getStaff(sid).subscribe((data:any)=> {
      console.log(data);
      this.currentStaff = data;
  },(error:any) => {
    this.flashMessagesService.show(error.error, {cssClass: 'alert-danger', timeout: 3000});
  });

}

getStaff(id:any){
  this.staff.getStaff(id).subscribe((data)=>{
    this.currentStaff=data;
    console.log(this.currentStaff)
    this.staffname=this.currentStaff.staffname
    this.stream=this.currentStaff.stream
    this.doj=this.currentStaff.doj
    this.address=this.currentStaff.address
    this.designation=this.currentStaff.designation
    this.staffid=this.currentStaff.staffid
  },(error:any) => {
    this.flashMessagesService.show(error.error, {cssClass: 'alert-danger', timeout: 3000});
  })

  this.updateDisplay=true
}

updateStaff(){
  const student={
    staffname: this.staffname, 
    stream: this.stream,
    doj: this.doj,
    address: this.address,
    designation:this.designation,
    staffid: this.staffid
  }

  this.staff.updateStaff(this.staffid,student).subscribe((data:any)=>{

      this.updateDisplay=!this.updateDisplay;
  location.reload();
  },(error:any) => {
    this.flashMessagesService.show(error.error, {cssClass: 'alert-danger', timeout: 3000});
  })

}
onLogoutClick() {
  this.auth.logout();
  this.router.navigate(['login']);
  this.flashMessagesService.show('You are logged out', {cssClass: 'alert-success', timeout: 3000});
  return false;
}
setUpdate(){
  this.updateDisplay=!this.updateDisplay;
}
}


// staffname varchar(45) 
// stream varchar(45) 
// doj int 
// address varchar(45) 
// designation varchar(45) 
// staffid