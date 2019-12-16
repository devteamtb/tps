import { Component,OnInit} from '@angular/core';
import { first } from 'rxjs/operators';
import { NavigationCancel,
        Event,
        NavigationEnd,
        NavigationError,
        NavigationStart,
        Router } from '@angular/router';
import { User } from '../User';
import { UserService } from '../user.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    loading = false;
    currentUser: User;
    userFromApi: User;
	constructor(
        private userService: UserService,
		private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
		this.userFromApi = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loading = true;
		this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
            this.loading = false;
			this.userFromApi = user;
        });
    }

	logout() {
        this.authenticationService.logout();
        this.router.navigate(['/admin/login']);
    }
}