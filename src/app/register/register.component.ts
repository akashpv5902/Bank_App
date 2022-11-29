import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  acno="";
  pswd="";
  uname="";
//register model
  registerForm=this.fb.group({ //group
    uname:[''],  //array
    acno:[''],
    pswd:['']


  })
  //control -ts file model link to html file

  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  register(){
    console.log(this.registerForm);
    
    // alert('clicked')
    var username=this.registerForm.value.uname;
    var password=this.registerForm.value.pswd;
    var acno=this.registerForm.value.acno;

    const result=this.ds.register(acno,username,password)
    if(result){
      alert('register succesfull')
      this.router.navigateByUrl('')
    }
    else{
      alert('register failed')
      this.router.navigateByUrl('')
    }
  }

}

