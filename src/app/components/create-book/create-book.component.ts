import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent {
  book: any = {
    id: null,
    title: '',
    authorId: null,
    published: false,
    year: null,
    description: '',
    dateCreated: ''
  };

  constructor(public activeModal: NgbActiveModal) {}

  onSubmit() {

  }

  cancelCreation() {
    this.activeModal.dismiss('cancel');
  }

}
