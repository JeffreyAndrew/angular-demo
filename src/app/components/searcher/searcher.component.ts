import { Component } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Book } from 'src/app/entities/book.model';
import { BookService } from 'src/app/services/book.service';
import { CreateBookComponent } from '../create-book/create-book.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent {
  books: Book[] = [];
  pagedBooks: Book[] = [];
  itemsPerPage = 3;
  currentPage = 1;
  searchTerm: string = '';

  modalRef: BsModalRef;

  constructor(private bookService: BookService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.books = this.bookService.getBooks();
    this.setPage(this.currentPage);
  }
  openCreateBookDialog() {
    const modalRef = this.modalService.open(CreateBookComponent);

    modalRef.result.then((result) => {
      if (result === 'cancel') {
        console.log('Creación cancelada');
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedBooks = this.books.slice(startIndex, endIndex);
  }

  editBook(updatedBook: Book): void {
    const index = this.books.findIndex(book => book.id === updatedBook.id);
    if (index !== -1) {
      this.books[index] = updatedBook;
    }
  }

  deleteBook(bookId: number): void {
    const index = this.books.findIndex(book => book.id === bookId);
    if (index !== -1) {
      this.books.splice(index, 1);
    }
  }

  getAuthorName(authorId: number): string {
    const author = this.bookService.getAuthors().find(a => a.id === authorId);
    return author ? author.name : 'Unknown Author';
  }

}
