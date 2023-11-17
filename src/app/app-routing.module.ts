import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListCardComponent } from './components/list-card/list-card.component';
import { AddCardComponent } from './components/add-card/add-card.component';

const routes: Routes = [
  { path: 'cards', component: ListCardComponent },
  { path: 'cards/add', component: AddCardComponent },
  { path: 'cards/edit/:id', component: AddCardComponent },
  { path: '**', redirectTo: '/cards' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
