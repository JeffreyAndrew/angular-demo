import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserModule } from '@angular/platform-browser';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MenuComponent } from './components/menu/menu.component';
import { SummaryComponent } from './components/summary/summary.component';
import { SearcherComponent } from './components/searcher/searcher.component';
import { TopHeaderComponent } from './components/top-header/top-header.component';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { CreateAuthorComponent } from './components/create-author/create-author.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SummaryComponent,
    SearcherComponent,
    TopHeaderComponent,
    CreateBookComponent,
    CreateAuthorComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
