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
    this.isSideNavExpanded = !this.isSideNavExpanded;
  }
}
