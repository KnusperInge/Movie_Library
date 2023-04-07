import { Component, OnDestroy, OnInit } from '@angular/core';
import { SideNavService } from '../shared/sideNav.service';

import { BreakpointService } from '../shared/breakpoint.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public navopened: boolean = false;
  public searchOpened: boolean;
  public seachIconisVisible: boolean;
  isMobile: boolean;
  currentScreenWidth: string;

  constructor(
    private sideNavService: SideNavService,
    private bPS: BreakpointService
  ) {}

  ngOnInit(): void {
    this.sideNavService.getValue().subscribe((value) => {
      this.navopened = value;
    });
    this.sideNavService.getValueSearchbar().subscribe((value) => {
      this.searchOpened = value;
    });

    this.sideNavService
      .getValueSearchIcon()
      .subscribe((value) => (this.seachIconisVisible = value));
    this.bPS.getSize().subscribe((value) => {
      this.currentScreenWidth = value;
      this.checkScreenWidth(value);
    });
  }

  checkScreenWidth(value) {
    if (this.currentScreenWidth == 'XSmall') {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  toggleNav() {
    if (!this.navopened) {
      this.sideNavService.setValue(true);
    } else {
      this.sideNavService.setValue(false);
    }
  }

  toogleSearch() {
    if (!this.searchOpened) {
      this.sideNavService.setValueSearchbar(true);
    } else {
      this.sideNavService.setValueSearchbar(false);
    }
  }
}
