import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  acno="";
  pswd="";
  amount="";

  //withdraw

  acno1="";
  pswd1="";
  amount1="";

  // current user

  user='';
  sdate:any;

  depositForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],

  })

  withdrawForm=this.fb.group({
    acno1:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd1:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]],
    amount1:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })
   

  constructor(private ds:DataService,private fb:FormBuilder,private router:Router) { 
    this.user=this.ds.currentUser;
    this.sdate=new Date;
  }

  ngOnInit(): void {
    if(!localStorage.getItem('currentAcno')){
      alert('please login first')
      this.router.navigateByUrl('');
    }
  }
  deposit(){
var acno=this.depositForm.value.acno;
var pswd=this.depositForm.value.pswd;
var amount=this.depositForm.value.amount;

if(this.depositForm.valid){

const result=this.ds.deposit(acno,pswd,amount)
if(result){
  alert(`${amount} is credited...Availble balance is ${result}`)
}
else{
  alert('transaction error')
}
}
else{
  alert('deposit failed')
}
  }

  withdraw(){
    // alert('withdraw clicked')
    var acno=this.withdrawForm.value.acno1;
    var pswd=this.withdrawForm.value.pswd1;
    var amount=this.withdrawForm.value.amount1;

   if(this.withdrawForm.valid){

    const result=this.ds.withdraw(acno,pswd,amount)
    if(result){
      alert(`${amount} is debited ..available balance is ${result}`)
    
    }
    else{
      alert('transaction error')
    }
  }
  else{
    alert('withdrawal failed')
  }
}

logout(){
  //remove user name and acno

  localStorage.removeItem('currentAcno')
  localStorage.removeItem('currentUser')
  this.router.navigateByUrl('')
}

delete() {
  // alert('delete clicked')
  this.acno=JSON.parse(localStorage.getItem('currentAcno')||'')
}
onCancel(){
  this.acno="";
}
}