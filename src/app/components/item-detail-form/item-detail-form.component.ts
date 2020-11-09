import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-item-detail-form',
  templateUrl: './item-detail-form.component.html',
  styleUrls: ['./item-detail-form.component.css']
})
export class ItemDetailFormComponent implements OnInit {
  @Output() save = new EventEmitter<Item>();
  @Input() item: Item;

  constructor() { }

  ngOnInit(): void {
  }

  submit() {
    const updatedItem = {
      ...this.item,

    };
    this.save.emit(updatedItem);
  }

}
