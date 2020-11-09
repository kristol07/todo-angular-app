import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemDetailFormComponent } from './components/item-detail-form/item-detail-form.component';
import { ItemComponent } from './containers/item/item/item.component';
import { ItemsComponent } from './containers/items/items/items.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ItemService } from './services/item.service';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    ItemDetailFormComponent,
    ItemComponent,
    ItemsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path:'', pathMatch: 'full', redirectTo: 'items'},
      {path:'items', component: ItemsComponent},
      {path:'items/:id', component: ItemComponent}
    ])
  ],
  providers: [ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
