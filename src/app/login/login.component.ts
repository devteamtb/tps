import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertModule,AlertService } from '../alert/index';
import { AuthenticationService } from '../authentication.service';

@Component({ templateUrl: 'login.component.html' })
@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    constructor(
	    private alertService: AlertService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { 
	    // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/admin/home']);
        }	
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'admin/home';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
					if(data.status === true){
						this.router.navigate([this.returnUrl]);
					}else{
					  this.loading = false; 	
					  this.error(data.message);
					}
				},
                error => {
					//console.log(error);
					//this.error = error;
                    this.loading = false;
                });
				
    }
	
	success(message: string) {
        this.alertService.success(message);
    }

    error(message: string) {
        this.alertService.error(message);
    }

    info(message: string) {
        this.alertService.info(message);
    }

    warn(message: string) {
        this.alertService.warn(message);
    }

    clear() {
        this.alertService.clear();
    }
}