import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/nav/navbar/navbar.component';
import { SidebarComponent } from './components/nav/sidebar/sidebar.component';
import { MenuComponent } from './components/nav/menu/menu.component';
import { SystemsComponent } from './components/systems/systems/systems.component';
import { SystemPanelComponent } from './components/systems/system-panel/system-panel.component';
import { TitleBarComponent } from './components/utils/title-bar/title-bar.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, SidebarComponent, MenuComponent, SystemsComponent, SystemPanelComponent, TitleBarComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
