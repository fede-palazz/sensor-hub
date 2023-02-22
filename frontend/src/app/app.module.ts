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
import { NewSystemComponent } from './components/systems/new-system/new-system.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    MenuComponent,
    SystemsComponent,
    SystemPanelComponent,
    TitleBarComponent,
    NewSystemComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
