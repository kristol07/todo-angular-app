import { identifierModuleUrl } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-detail-form',
  templateUrl: './item-detail-form.component.html',
  styleUrls: ['./item-detail-form.component.css']
})
export class ItemDetailFormComponent implements OnInit {
  @Output() save = new EventEmitter<Item>();
  @Output() delete = new EventEmitter<Item>();
  @Input() item: Item;
  editStatus: boolean = false;

  constructor(private router: Router,
    private itemService: ItemService) { }

  ngOnInit(): void {
    if (this.item === null) {
      this.item = this.generateNewItem();
    }
  }

  saveItem(item: Item): void {
    this.save.emit(item);
    this.editStatus = false;
  }

  createSubitem(): void {
    this.item = this.item === null ? this.generateNewItem() : this.item;
    this.item.children = this.item.children === null ? [] : this.item.children;
    var newSubItem = this.generateNewItem();
    newSubItem.id = `${this.item.id}-${newSubItem.id}`;
    this.item.children.push(newSubItem);
    this.item.done = false;

    this.editStatus = true;
  }

  deleteSubitem(id: string): void {
    this.item.children = this.item.children.filter((child) => child.id !== id);
    this.editStatus = true;
  }

  checkAll(): void {
    this.editStatus = true;

    this.item.children.forEach(child => child.done = this.item.done === true ? true : false);
  }

  checkChildStatus(): void {
    this.editStatus = true;

    var unfinishedItemsNumber = this.item.children.filter(child => child.done === false).length;
    this.item.done = unfinishedItemsNumber === 0 ? true : false;
  }

  checkFavorite(): void {
    this.editStatus = true;
  }

  discardChanges(): void {
    this.editStatus
      ? this.router.navigate(["/discard-changes"])
      : this.router.navigate(["/items"]);
  }


  generateNewItem(): Item {
    return {
      id: `${(new Date(Date.now())).getTime()}`,
      description: "",
      createdTime: new Date(Date.now()),
      done: false,
      favorite: false,
      children: null
    } as Item;
  }

  deleteItem(item: Item) {
    this.delete.emit(item);
  }

}
