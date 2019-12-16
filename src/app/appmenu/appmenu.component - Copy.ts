import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.css']
})
export class AppmenuComponent implements OnInit {
  @Input() userFromApi;
  sidebarMenu: any = {};
  constructor(private route: ActivatedRoute, private router: Router, private ps: UserService) {
      
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
		this.ps.get_menu(this.userFromApi.role_id).subscribe(res => {
		  this.sidebarMenu = res;
		});
    });
  }
}
