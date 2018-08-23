import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users;
  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.fetchUsers();
  }

  deleteUser(id) {
    this.authService.deleteUser(id).subscribe(response => {
      if (response.success) {
        this.fetchUsers();
        this.toastr.success(response.message);
      } else {
        this.toastr.error(response.message);
      }
    });
  }

  makeAdmin(id) {
    this.authService.makeAdmin(id).subscribe(response => {
      if (response.success) {
        this.fetchUsers();
        this.toastr.success(response.message);
      } else {
        this.toastr.error(response.message);
      }
    });
  }


  fetchUsers() {
    this.authService.getUsers().subscribe(response => {
      this.users = response.users;
      console.log(this.users);
    });
  }

}
