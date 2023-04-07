import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { BreakpointService } from '../shared/breakpoint.service';
import { SideNavService } from '../shared/sideNav.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  Response;
  showMessage: boolean = false;
  currentScreenWidth: string;
  isMobile: boolean;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authServ: AuthService,
    private bPs: BreakpointService,
    private sns: SideNavService
  ) {}

  ngOnInit(): void {
    this.sns.setValueSearchIcon(false);
    this.myForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.bPs.getSize().subscribe((value) => {
      this.currentScreenWidth = value;
      this.checkScreenWidth(value);
    });
  }
  checkScreenWidth(value) {
    if (
      this.currentScreenWidth == 'Small' ||
      this.currentScreenWidth == 'XSmall'
    ) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }
  async onSignIn() {
    this.Response = await this.authServ.signin(this.myForm.value);
    if (this.Response.state) {
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
        this.myForm.reset();
        this.router.navigate(['/home']);
      }, 3000);
    } else {
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
        this.myForm.reset();
      }, 5000);
    }
  }
}
