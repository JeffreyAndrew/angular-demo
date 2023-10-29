import { Component } from '@angular/core';
import { Book } from 'src/app/entities/book.model';
import { BookService } from 'src/app/services/book.service';

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

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.books = this.bookService.getBooks();
    this.setPage(this.currentPage);
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
