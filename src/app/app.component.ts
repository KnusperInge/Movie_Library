import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { SideNavService } from './shared/sideNav.service';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { BreakpointService } from './shared/breakpoint.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public opened: boolean = false;
  public authState: boolean = false;
  isTablet: boolean;
  isMobile: boolean;
  currentScreenWidth: string;
  Offset: number = 200;
  @Output() scrollDown: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private SideNavService: SideNavService,
    private router: Router,
    private authServ: AuthService,
    private bPS: BreakpointService
  ) {
    this.authServ
      .isAuthenticated()
      .subscribe((authStatus) => (this.authState = authStatus));
  }

  ngOnInit(): void {
    this.SideNavService.getValue().subscribe((value) => {
      this.opened = value;
    });

    this.bPS.getSize().subscribe((value) => {
      this.currentScreenWidth = value;
      this.checkScreenWidth(value);
    });
  }
  checkScreenWidth(value) {
    if (this.currentScreenWidth == 'XSmall') {
      console.log('APP', value);
      this.isMobile = true;
      this.isTablet = false;
    } else if (this.currentScreenWidth == 'Small') {
      this.isMobile = false;
      this.isTablet = true;
    } else if (this.currentScreenWidth == 'Medium') {
      this.isMobile = false;
      this.isTablet = true;
    } else {
      this.isMobile = false;
      this.isTablet = false;
    }
  }

  openHome() {
    this.router.navigate(['/home']);
    this.SideNavService.setValue(false);
  }

  openLogin() {
    this.router.navigate(['/login']);
    this.SideNavService.setValue(false);
  }
  openAddnew() {
    this.router.navigate(['newObject']);
    this.SideNavService.setValue(false);
  }

  logOut() {
    this.authServ.logOut();
    this.SideNavService.setValue(false);
  }
  @HostListener('window:scroll', ['$event'])
  scrollHandler(e) {
    let scrollmaxheight = (e.target as HTMLElement).scrollTop - this.Offset;
    let scrolltop =
      (e.target as HTMLElement).scrollHeight -
      (e.target as HTMLElement).clientHeight -
      this.Offset;

    if (scrollmaxheight == scrolltop) {
      this.scrollDown.emit(true);
      this.SideNavService.setScrollValue(true);
    }
  }
}
