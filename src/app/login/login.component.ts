import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../basic-authentication.service';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''
  errorMessage = 'Invalid Credentials'
  invalidLogin = false

  constructor(private router: Router,
    private hardcodedAuthenticationService: HardcodedAuthenticationService,
    private basicAuthenticationService: BasicAuthenticationService
    ) { }

  ngOnInit(): void {
  }

  // login() {
  //   // console.log(this.username);

  //   // if(this.username == 'admin' && this.password == 'password') {
  //   if(this.hardcodedAuthenticationService.authenticate(this.username, this.password)) {
  //       this.router.navigate(['home', this.username])
  //     this.invalidLogin = false
  //   }
  //   else {
  //     this.invalidLogin = true
  //   }
  // }

  login() {
    this.basicAuthenticationService.authenticate(this.username, this.password).subscribe(
      data => {
        this.router.navigate(['home', this.username])
        this.invalidLogin = false
      },
      error => this.invalidLogin = true
    )
  }
}
