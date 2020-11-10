import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemDetailFormComponent } from './components/item-detail-form/item-detail-form.component';
import { ItemComponent } from './containers/item/item/item.component';
import { ItemsComponent } from './containers/items/items/items.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ItemService } from './services/item.service';
import { ItemSearchComponent } from './components/item-search/item-search.component';
import { DiscardChangesComponent } from './components/discard-changes/discard-changes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    ItemDetailFormComponent,
    ItemComponent,
    ItemsComponent,
    ItemSearchComponent,
    DiscardChangesComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path:'', pathMatch: 'full', redirectTo: 'items'},
      {path:'items', component: ItemsComponent},
      {path:'items/:id', component: ItemComponent},
      {path: 'discard-changes', component: DiscardChangesComponent}
    ]),
    BrowserAnimationsModule
  ],
  providers: [ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
