import { Injectable } from '@angular/core';
import { fromEvent, map, Observable, startWith } from 'rxjs';

const TABLET_BREAKPOINT = 700; // Must be equal to ($tablet + 1px) in variables.scss

@Injectable({
  providedIn: 'root',
})
export class ViewDetectorService {
  isMobileView$!: Observable<any>;

  constructor() {
    // Checks if screen size is less than tablet breakpoint
    const isMobileViewport = () =>
      document.body.offsetWidth <= TABLET_BREAKPOINT;

    // Create observable from window resize event so it only fires every 5ms
    const screenSizeChanged$ = fromEvent(window, 'resize').pipe(
      map(isMobileViewport)
    );
    // Start off with the initial value use the isScreenSmall$ | async in the
    // view to get both the original value and the new value after resize.
    this.isMobileView$ = screenSizeChanged$.pipe(startWith(isMobileViewport()));
  }

  getMobileView(): Observable<boolean> {
    return this.isMobileView$;
  }
}
