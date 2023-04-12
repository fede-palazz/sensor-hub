import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/nav/navbar/navbar.component';
import { SidebarComponent } from './components/nav/sidebar/sidebar.component';
import { NavMenuComponent } from './components/nav/nav-menu/nav-menu.component';
import { SystemsComponent } from './components/systems/systems/systems.component';
import { SystemPanelComponent } from './components/systems/system-panel/system-panel.component';
import { TitleBarComponent } from './components/utils/title-bar/title-bar.component';
import { NewSystemComponent } from './components/systems/new-system/new-system.component';

import { InMemoryDataService } from './data/in-memory-data.service';
import { environment } from 'src/environments/environment';
import { NewNodeComponent } from './components/systems/new-node/new-node.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { SystemOverviewComponent } from './components/dashboard/system-overview/system-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    NavMenuComponent,
    SystemsComponent,
    SystemPanelComponent,
    TitleBarComponent,
    NewSystemComponent,
    NewNodeComponent,
    DashboardComponent,
    SystemOverviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ZXingScannerModule,
    environment.useMockServer
      ? HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
          dataEncapsulation: false,
          delay: 500,
        })
      : [],
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
