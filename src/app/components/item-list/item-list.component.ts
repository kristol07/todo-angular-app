import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  @Input() items: Item[];
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getTimeNow() : Date{
    return new Date(Date.now());
  }

  createItem(){
    this.router.navigate(['/items', this.getTimeNow().getTime().toString()]);
  }

}
