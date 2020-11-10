import { Component, OnChanges, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounce, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.css']
})
export class ItemSearchComponent implements OnInit {

  items$: Observable<Item[]>;
  private search = new Subject<string>();
  showDone: boolean = false;
  
  constructor(private itemService: ItemService) { }

  filterItems(term: string): void {
    this.search.next(term);
  }

  ngOnInit(): void {
    this.items$ = this.search.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.itemService.searchItems(term)),
    );
  }

  reload(): void {    
    this.items$ = this.itemService.getItems();
  }

  saveItem(item: Item): void {
    this.itemService.updateItem(item).subscribe(() => console.log("update item"));
  }

  sortByDescription(): void {
    this.items$ = this.items$.pipe(
      map(items => items.sort(
        (a,b)=>a.description.localeCompare(b.description)
        ))
    );
  }

  sortByCreatedTime(): void {
    this.items$ = this.items$.pipe(
      map(items => items.sort(
        (a,b)=>a.createdTime.toString().localeCompare(b.createdTime.toString())
        ))
    );
  }

  switchDone(): void {
    this.showDone
    ? this.reload()
    : this.items$ = this.items$.pipe(
      map(items=>items.filter(item=> item.done == false)));
    
      this.showDone = !this.showDone;
  }  
}
