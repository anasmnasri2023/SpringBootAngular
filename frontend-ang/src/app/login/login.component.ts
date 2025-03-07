import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {group} from '@angular/animations';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  public loginForm! : FormGroup;
  constructor(private fb: FormBuilder ,
              private authService : AuthService ,
              private router : Router ) {
  }
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required], // Ajout de validation
      password: ['', Validators.required]
    });
  }

  login() {
    let username = this.loginForm.value.username;
    let password= this.loginForm.value.password;
    let auth =this.authService.login(username,password);
    if(auth){
      this.router.navigateByUrl("/admin")
    }
  }
}
