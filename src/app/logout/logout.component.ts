import { Component, OnInit } from '@angular/core';
import { BasicAuthenticationService } from '../basic-authentication.service';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(//private hardcodedAuthenticationService: HardcodedAuthenticationService
              private basicAuthenticationService : BasicAuthenticationService) { }

  ngOnInit(): void {
    //this.hardcodedAuthenticationService.logout();
    this.basicAuthenticationService.logout();
  }

}
