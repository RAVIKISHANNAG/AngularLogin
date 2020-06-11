import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData={email:"",
password:""}

  constructor(private _auth:AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    return this._auth.login(this.loginUserData).subscribe(res=>{console.log(res)
      if(res.msg.token){
    localStorage.setItem('token',res.msg.token)
  this._router.navigate(['/special'])}},
    err=> console.log(err))


  }

}
