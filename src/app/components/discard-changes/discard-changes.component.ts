import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discard-changes',
  templateUrl: './discard-changes.component.html',
  styleUrls: ['./discard-changes.component.css']
})
export class DiscardChangesComponent implements OnInit {
  // @Output() isDiscard = new EventEmitter<boolean>();

  constructor(private router: Router,
    private location: Location) { }

  ngOnInit(): void {
  }

  confirm(choice: boolean){
    // this.isDiscard.emit(choice);
    choice
    ? this.router.navigate(["/items"])
    : this.location.back();
  }

}
