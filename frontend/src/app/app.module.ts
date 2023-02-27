import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/nav/navbar/navbar.component';
import { SidebarComponent } from './components/nav/sidebar/sidebar.component';
import { MenuComponent } from './components/nav/menu/menu.component';
import { SystemsComponent } from './components/systems/systems/systems.component';
import { SystemPanelComponent } from './components/systems/system-panel/system-panel.component';
import { TitleBarComponent } from './components/utils/title-bar/title-bar.component';
import { NewSystemComponent } from './components/systems/new-system/new-system.component';
import { InMemorySystemsService } from './data/in-memory-systems.service';

import { environment } from 'src/environments/environment';

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
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    environment.useMockServer
      ? HttpClientInMemoryWebApiModule.forRoot(InMemorySystemsService, {
          dataEncapsulation: false,
          delay: 500,
        })
      : [],
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
