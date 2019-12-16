import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {User} from './User';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>('http://localhost:4000/users');
    }

    getById(id: number) {
        return this.http.get<User>('http://localhost:4000/users/edit/'+id);
    }
	
	get_menu(role_id:number){
	    return this.http.get<User>('http://localhost:4000/users/get_menu/'+role_id);
	}
}