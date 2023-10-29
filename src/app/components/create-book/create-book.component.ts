import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookService } from './../../services/book.service';
import { Author } from './../../entities/author.model';
import { Book } from './../../entities/book.model';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent {
  // newBookForm: FormGroup;
  // authors: Author[]; // Populate authors from your data source

  // constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private bookService: BookService) { }

  // ngOnInit(): void {
  //   this.newBookForm = this.fb.group({
  //     title: ['', Validators.required],
  //     authorId: [null, Validators.required],
  //     published: [false],
  //     year: [null, [Validators.required, Validators.min(1800), Validators.max(2023)],
  //       description: [''],
  //   });
  // }

  // onClose() {
  //   this.bsModalRef.hide();
  // }

  // onSubmit() {
  //   if (this.newBookForm.valid) {
  //     const newBook = this.newBookForm.value;
  //     // Call a service method to add the new book
  //     this.bookService.addBook(newBook);
  //     this.onClose(); // Close the dialog
  //   }
  // }
}
