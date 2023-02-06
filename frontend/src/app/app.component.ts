import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isSideNavExpanded: boolean = true;

  constructor() {}

  ngOnInit() {}

  toggleSideNav(): void {
    // this.isSideNavExpanded = !this.isSideNavExpanded;
    const width = window.innerWidth;
    const height = window.innerHeight;

    console.log(
      `The viewport's width is ${width} and the height is ${height}.`
    );
  }
}
