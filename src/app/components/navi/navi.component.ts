import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/models/userModel';
import { UserOperationClaimDto } from 'src/app/models/userOperationClaimDto';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  email = this.localStorageService.get('email');
  user: UserModel = new UserModel();
  check: boolean;
  claim: UserOperationClaimDto[];
  userıd: any;
  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }
  load() {
    this.getEmail();
    this.check = this.authService.isAuthenticated();
    this.checkToEmail();
    this.haveRole();
  }

  checkToEmail() {
    if (this.localStorageService.get('email')) {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    this.localStorageService.clear();
    this.toastrService.success('Başarıyla Çıkış Yapıldı');
    this.router.navigate(['/']);
  }
  getEmail() {
    if (this.email) {
      this.userService.GetByMail(this.email).subscribe((response) => {
        this.user = response;
        this.authService.getClaims(this.user.id).subscribe((response) => {
          if (response.data != null) {
            this.localStorageService.set('yetki', 'var');
            this.localStorageService.set('id', this.user.id.toString());
            this.userıd = this.localStorageService.get('id');
            this.haveRole();
          }
        });
      });
    }
  }

  haveRole() {
    this.authService.setClaim(Number(this.userıd)).subscribe((response) => {
      for (let index = 0; index < response.data.length; index++) {
        if (response.data[index].claimName == 'admin') {
          this.localStorageService.set('claim', response.data[index].claimName);
        }
      }
    });
  }
}
