import { Component, Input, OnChanges, OnInit } from '@angular/core';
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

  items: Item[];
  private search = new Subject<string>();
  showDone: boolean = false;

  constructor(private itemService: ItemService) { }


  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.itemService.getItems().subscribe(items => this.items = items);
  }

  filterItems(term: string): void {
    if (!term.trim()) {
      this.reload();
    }
    this.itemService.getItems().pipe(
      map(items => this.items = items.filter(item => item.description.toLowerCase().includes(term.toLowerCase())))
    ).subscribe(items => this.items = items);
    // filter(item => item.description.includes(term));
  }

  saveItem(item: Item): void {
    this.itemService.updateItem(item).subscribe(() => console.log("update item"));
  }

  sortByDescription(): void {
    this.items = this.items.sort((a, b) => a.description.localeCompare(b.description));
  }

  sortByCreatedTime(): void {
    this.items = this.items.sort((a, b) => a.createdTime.toString().localeCompare(b.createdTime.toString()));
  }

  switchDone(): void {
    this.showDone
      ? this.reload()
      : this.items = this.items.filter(item => item.done === false);

    this.showDone = !this.showDone;
  }

  getUnfinishedSubitemNumber(item: Item): number {
    return item.children.filter(child => child.done == false).length;
  }

  changeDoneForChildren(item: Item) {
    var childrenStatus = item.done ? true : false;
    item.children.forEach(child => child.done = childrenStatus);
  }
}
