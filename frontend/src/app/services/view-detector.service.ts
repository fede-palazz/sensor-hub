import { Injectable } from '@angular/core';
import { fromEvent, map, Observable, startWith, tap } from 'rxjs';

const TABLET_BREAKPOINT = 700; // Must be equal to ($tablet - 1) in variables.scss
const DESKTOP_BREAKPOINT = 1024;

@Injectable({
  providedIn: 'root',
})
export class ViewDetectorService {
  isMobileView$!: Observable<boolean>;
  isTabletView$!: Observable<boolean>;

  constructor() {
    const isMobileViewport = () =>
      document.body.offsetWidth <= TABLET_BREAKPOINT;
    const isTabletViewport = () =>
      document.body.offsetWidth <= DESKTOP_BREAKPOINT;
    // Create observable from window resize event
    const screenSizeChanged$ = fromEvent(window, 'resize');
    this.isMobileView$ = screenSizeChanged$.pipe(
      map(isMobileViewport),
      startWith(isMobileViewport())
    );
    this.isTabletView$ = screenSizeChanged$.pipe(
      map(isTabletViewport),
      startWith(isTabletViewport())
    );
  }

  getMobileView() {
    return this.isMobileView$;
  }

  getTabletView() {
    return this.isTabletView$;
  }
}
