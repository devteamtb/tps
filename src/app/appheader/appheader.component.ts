import { Component, OnInit,Input} from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { NavigationCancel,
        Event,
        NavigationEnd,
        NavigationError,
        NavigationStart,
        Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';		
@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent implements OnInit {

  @Input() userFromApi;
  constructor(private loadingBar: SlimLoadingBarService, private router: Router,private authenticationService: AuthenticationService) {
    this.router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
	
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
  
  ngOnInit() {
  }
  
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/admin/login']);
  }
}
