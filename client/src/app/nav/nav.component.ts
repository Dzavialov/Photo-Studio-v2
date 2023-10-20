import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  loginMode = false;
  model: any = {};

  constructor(public accountService: AccountService, private router: Router) {}

  login(){
    this.accountService.login(this.model).subscribe({
      next: () => this.router.navigateByUrl('/members'),
    });
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  onLogin() {
    this.loginMode = !this.loginMode;
  }
}
