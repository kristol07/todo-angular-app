import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { defaultIfEmpty } from 'rxjs/operators';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  itemId: string;
  item$: Observable<Item>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private itemService: ItemService) { }

  ngOnInit(): void {
    this.itemId = this.activatedRoute.snapshot.params['id'];
    if(this.itemId !== null){
      this.item$ = this.itemService.getItem(this.itemId);
    }
  }

  save(item: Item){
    // !this.itemService.existsItem(item.id)
    // ? this.itemService.updateItem(item).subscribe(()=> this.router.navigate([`/items`]))
    // : this.itemService.addItem(item).subscribe(()=>this.router.navigate([`/items`]));
    this.itemService.upsertItem(item).subscribe(()=> this.router.navigate([`/items/${item.id}`]));
    alert("success");
  }

  delete(item: Item)
  {
    this.itemService.deleteItem(item.id).subscribe(()=> this.router.navigate([`/items`]));
  }

  generateNewItem(): Item {
    return {
      id: `${(new Date(Date.now())).getTime()}`,
      description: "new item",
      createdTime: new Date(Date.now()),
      done: false,
      favorite: false,
      children: null
    } as Item;
  }

}