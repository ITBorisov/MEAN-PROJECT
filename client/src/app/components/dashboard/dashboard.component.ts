import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUsers().subscribe(response => {
      this.users = response.users;
      console.log(this.users);
    });
  }

  deleteUser(id) {

  }
  makeAdmin(id) {

  }

}
