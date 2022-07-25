import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StudentService } from 'src/app/services/student.service';
import { FlashMessagesService} from "angular2-flash-messages";
import { Router } from "@angular/router";

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {


  currentStudent!:any
  studentname: any;
  department: any;
  address: any;
  phoneno: any;
  batch: any;
  studentid: any;
  updateDisplay: boolean | undefined;

  constructor(private auth:AuthService,
              private student:StudentService,
              private flashMessagesService: FlashMessagesService,
              private router: Router) { }

  ngOnInit(): void {
    var sid=this.auth.getId()
    console.log(sid)
    this.student.getStudent(sid).subscribe((data:any)=> {
      console.log(data);
      this.currentStudent = data;

    },(error:any) => {
      this.flashMessagesService.show(error.error, {cssClass: 'alert-danger', timeout: 3000});
    });
  }

  getStudent(id:any){
    this.student.getStudent(id).subscribe((data)=>{
      this.currentStudent=data;
      console.log(this.currentStudent)
      this.studentname=this.currentStudent.studentname
      this.department=this.currentStudent.department
      this.address=this.currentStudent.address
      this.phoneno=this.currentStudent.phoneno
      this.batch=this.currentStudent.batch
      this.studentid=this.currentStudent.studentid
    },(error:any) => {
      this.flashMessagesService.show(error.error, {cssClass: 'alert-danger', timeout: 3000});
    })

    this.updateDisplay=true
  }
  
  updateStudent(){
    const student={
      studentname: this.studentname, 
      department: this.department,
      address: this.address,
      phoneno: this.phoneno,
      batch:this.batch,
      studentid: this.studentid
    }
  
    this.student.updateStudent(this.studentid,student).subscribe((data:any)=>{
  
        this.updateDisplay=!this.updateDisplay;
    location.reload();
    },(error:any) => {
      this.flashMessagesService.show(error.error, {cssClass: 'alert-danger', timeout: 3000});
    })
  
  }
  setUpdate(){
    this.updateDisplay=!this.updateDisplay;
  }

  onLogoutClick() {
    this.auth.logout();
    this.router.navigate(['login']);
    this.flashMessagesService.show('You are logged out', {cssClass: 'alert-success', timeout: 3000});
    return false;
  }

}

