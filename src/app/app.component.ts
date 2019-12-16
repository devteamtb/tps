import { Component } from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { NavigationCancel,
        Event,
        NavigationEnd,
        NavigationError,
        NavigationStart,
        Router } from '@angular/router';


import { UserService } from './user.service';
import { AuthenticationService } from './authentication.service';
import { User } from './User';
import { Role } from './Role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;	
  title = 'Trasporter';
  constructor(private loadingBar: SlimLoadingBarService, private router: Router,private authenticationService: AuthenticationService) {
    this.router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
	this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  
  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this.loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this.loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this.loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this.loadingBar.stop();
    }
  }
  
  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }
  
  logout() {
        this.authenticationService.logout();
        this.router.navigate(['/admin/login']);
  }
}
