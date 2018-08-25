import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  private isAuth = false;
  private authListenerSubs: Subscription;
  user;
  username;
  messageForm;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.isAuth = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthState().subscribe(result => {
      this.isAuth = result;
    });
    this.username = this.route.snapshot.paramMap.get('id');
    this.authService.getPublicUserProfile(this.username).subscribe(response => {
      this.user = response;
    });

    this.messageForm = new FormGroup({
      message: new FormControl('', {validators: [Validators.required]})
    });
  }


  sendMessage() {

    if (!this.messageForm.valid) {
      return;
    }

    this.authService.sendMessage(this.messageForm.value.message, this.username).subscribe(response => {
      if (response.success) {
        this.toastr.success(response.message);
        this.messageForm.reset();
      } else {
        this.toastr.error(response.message);
      }
    });
  }

}
