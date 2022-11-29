import { Injectable } from '@angular/core';
import { ArgumentOutOfRangeError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //current user

  currentUser="";

  //current acno
  currentAcno="";

  constructor() { }
  userDetails:any={
    1000:{acno:1000,username:'sanil',password:1000,balance:1000,transaction:[]},
    1001:{acno:1001,username:'akhil',password:1001,balance:1000,ransaction:[]},
    1002:{acno:1002,username:'arvind',password:1002,balance:1000,ransaction:[]}
  }
  register(acno:any,username:any,password:any){
    let userDetails=this.userDetails
    if(acno in userDetails){
   return false;
    }
    else{
      userDetails[acno]={
        acno:acno,
        username:username,
        password:password,
        balance:0,
        
        
      }
      console.log(userDetails);
      
      return true;
    }
  }
  login(acno:any,pswd:any){
    let userDetails=this.userDetails
    if(acno in userDetails){
      if(pswd==userDetails[acno]['password']){
        this.currentUser=userDetails[acno]['username']
        this.currentAcno=acno;
        return true;
      }
      else{
        return false;

      }
    }
    else{
      return false;
    }
  }

deposit(acno:any,pswd:any,amt:any){
  let userDetails=this.userDetails
  var amount=parseInt(amt)
  if(acno in userDetails){
    if(pswd==userDetails[acno]['password']){
      userDetails[acno]['balance'] += amount;
      userDetails[acno]['transaction'].push({
        type:'Credit',
        amount:amount
      })
      console.log(userDetails);
      
      return userDetails[acno]['balance']
    }
    else{
      alert('password incorrect')
      return false;
    }
  }
  else{
    alert('invalid userdetails')
    return false;
  }
}
withdraw(acno:any,pswd:any,amt:any){
  let userDetails=this.userDetails;
  var amount=parseInt(amt)
  if(acno in userDetails){
    if(pswd==userDetails[acno]['password']){
      if(userDetails[acno]['balance']>=amount){
        userDetails[acno]['balance'] -=amount;
        userDetails[acno]['transaction'].push({
          type:'Debit',
          Amount:amount
        })
        return userDetails[acno]['balance']
      }
      else{
        alert('insufficient funds')
        return false;
      }
    }
    else{
      alert('password incorrect')
      return false;
    }
  }
}
getTransaction(acno:any){
  return this.userDetails[acno]['transaction']
}
}
