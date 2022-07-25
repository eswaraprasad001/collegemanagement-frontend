import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { StaffService } from 'src/app/services/staff.service';
import { FlashMessagesService} from "angular2-flash-messages";
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  staffs!:any[]
  users!:any[]
  students!:any[]
  currentStudent!:any
  currentStaff!:any
  currentUser!:any
  studentname: any;
  department: any;
  address: any;
  phoneno: any;
  batch: any;
  studentid: any;
  email: any;
  name: any;
  status: any;
  isadmin: any;
  updateDisplay: boolean | undefined;
  id: any;
  addStaffs: boolean=false;
  staffname: any;
  stream: any;
  doj: any;
  designation: any;
  staffid: any;
  saddress: any;
  addStudents: boolean=false;
  addUsers:boolean=false
  password: any;
  sid: any;

  constructor(private auth:AuthService,
    private admin:AdminService,
    private flashMessagesService: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.admin.getAllStaffs().subscribe((data:any)=> {
      console.log(data);
      this.staffs = data;
    });
    this.admin.getAllStudents().subscribe((data:any)=> {
      console.log(data);
      this.students = data;
    });
    this.admin.getAllUsers().subscribe((data:any)=> {
      console.log(data);
      this.users = data;
    });
  }

  // getStudent(id:any){
  //   this.admin.getStaff(id).subscribe((data)=>{
  //     this.currentStudent=data;
  //     console.log(this.currentStudent)
  //     this.studentname=this.currentStudent.studentname
  //     this.department=this.currentStudent.department
  //     this.address=this.currentStudent.address
  //     this.phoneno=this.currentStudent.phoneno
  //     this.batch=this.currentStudent.batch
  //     this.studentid=this.currentStudent.studentid
  //   })
  // }

  getUser(id:any){
    this.admin.getUser(id).subscribe((data)=>{
      this.currentUser=data;
      console.log(this.currentUser)
      this.id=this.currentUser.id
      this.email=this.currentUser.email
      this.name=this.currentUser.name
      this.status=this.currentUser.status
      this.isadmin=this.currentUser.isadmin
      this.password=this.currentUser.password
    })

    this.updateDisplay=true
  }


  

  addStudent(){

    const student={
      studentname: this.studentname,
      department: this.department,
      address: this.saddress,
      phoneno: this.phoneno,
      batch: this.batch,
      studentid: this.studentid

    }
    console.log(student)
    this.admin.addStudent(student).subscribe((data: any) => {
      if (data.success) {
        this.addStudents=!this.addStudents;
      }
      location.reload();
})
  }

  addStaff(){

    const staffs={
      staffname: this.staffname,
      stream: this.stream,
      doj: this.doj,
      address: this.saddress,
      designation: this.designation,
      staffid: this.staffid

    }
    console.log(staffs)
    this.admin.addStaff(staffs).subscribe((data: any) => {
      if (data.success) {
        this.addStaffs=!this.addStaffs;
      }
      location.reload();
})
  }


  updateUser(){
    const user={
      id:this.id,
      name: this.name, 
      email: this.email,
      status: this.status,
      password:this.password,
      isadmin: this.isadmin,
    }
  
    this.admin.updateUser(this.id,user).subscribe((data:any)=>{
  
        this.updateDisplay=!this.updateDisplay;
    location.reload();
    })
  
  }

  deleteUser(id: any){
    console.log(id)
    this.admin.deleteUser(id).subscribe((data: any) => {
      if (data.success) {
          console.log("user deleted")
      }
      location.reload();
    })
  };

 
  setTrue(){
    console.log(this.addStaffs)
    this.addStaffs=!this.addStaffs;
  
  
  }

  setTrue1(){
this.addStudents=!this.addStudents
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
