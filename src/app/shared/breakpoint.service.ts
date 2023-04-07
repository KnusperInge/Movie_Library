import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
@Injectable()
export class BreakpointService {
  private isMobile: BehaviorSubject<string>;
  private currentScreenSize: string;
  destroyed = new Subject<void>();

  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor(breakpointObserver: BreakpointObserver) {
    this.isMobile = new BehaviorSubject<string>('');
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize =
              this.displayNameMap.get(query) ?? 'Unknown';
            this.isMobile.next(this.currentScreenSize);
          }
        }
      });
  }

  getSize() {
    return this.isMobile.asObservable();
  }
}
