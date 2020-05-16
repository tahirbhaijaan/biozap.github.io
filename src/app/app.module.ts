import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './components/auth/auth.component';
import { LoaderComponent } from './components/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { TabsComponent } from './components/tabs/tabs.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddNewComponent } from './components/add-new/add-new.component';
import { CutComponent } from './components/cut/cut.component';
import { TableComponent } from './components/table/table.component';
import { ChipSetComponent } from './components/chip-set/chip-set.component';
import { SelectComponent } from './components/select/select.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AuthComponent,
    LoaderComponent,
    TabsComponent,
    DashboardComponent,
    AddNewComponent,
    CutComponent,
    TableComponent,
    ChipSetComponent,
    SelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
