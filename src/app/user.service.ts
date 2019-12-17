import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../environments/environment';

import {User} from './User';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(this.getHostURL()+'users');
    }

    getById(id: number) {
        return this.http.get<User>(this.getHostURL()+'users/edit/'+id);
    }
	
	get_menu(role_id:number){
	    return this.http.get<User>(this.getHostURL()+'users/get_menu/'+role_id);
	}
	
	getHostURL(): string {
	   return environment.apiHost;
    }
}