import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearcherComponent } from './components/searcher/searcher.component';
import { SummaryComponent } from './components/summary/summary.component';

const routes: Routes = [
  { path: 'searcher', component: SearcherComponent },
  { path: 'summary', component: SummaryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
