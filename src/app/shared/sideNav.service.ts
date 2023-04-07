import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SideNavService {
  private routerInfo: BehaviorSubject<boolean>;
  private searchBar: BehaviorSubject<boolean>;
  private searchIconVisible: BehaviorSubject<boolean>;
  private isScrolled: BehaviorSubject<boolean>;
  constructor() {
    this.routerInfo = new BehaviorSubject<boolean>(false);
    this.searchBar = new BehaviorSubject<boolean>(false);
    this.searchIconVisible = new BehaviorSubject<boolean>(true);
    this.isScrolled = new BehaviorSubject<boolean>(false);
  }

  setValue(newValue: boolean): void {
    this.routerInfo.next(newValue);
  }
  getValue(): Observable<boolean> {
    return this.routerInfo.asObservable();
  }

  setValueSearchbar(newValue: boolean) {
    this.searchBar.next(newValue);
  }
  getValueSearchbar(): Observable<boolean> {
    return this.searchBar.asObservable();
  }

  setValueSearchIcon(newValue: boolean) {
    this.searchIconVisible.next(newValue);
  }
  getValueSearchIcon() {
    return this.searchIconVisible.asObservable();
  }
  setScrollValue(value: boolean) {
    this.isScrolled.next(value);
  }
  getScrollValue() {
    return this.isScrolled.asObservable();
  }
}
