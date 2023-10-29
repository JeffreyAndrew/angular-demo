import { Injectable } from '@angular/core';
import { Book } from '../entities/book.model';
import { initialAuthors, initialBooks } from './initial-data';
import { Author } from '../entities/author.model';
import { Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class BookService {
    private books: Book[] = [];
    private authors = initialAuthors;

    // Subject para notificar cambios en los libros
    private booksUpdated = new Subject<Book[]>();

    constructor() {
        this.books = initialBooks;
    }

    createBook(book: Book): void {
        this.books.push(book);
    }

    getBooks(): Book[] {
        return this.books;
    }

    getBookById(id: number): Book | undefined {
        return this.books.find(book => book.id === id);
    }

    updateBook(updatedBook: Book): void {
        const index = this.books.findIndex(book => book.id === updatedBook.id);
        if (index !== -1) {
            this.books[index] = updatedBook;
        }
    }

    deleteBook(id: number): void {
        const index = this.books.findIndex(book => book.id === id);
        if (index !== -1) {
            this.books.splice(index, 1);
        }
    }

    getAuthors(): Author[] {
        return this.authors;
    }

    // Generar registros aleatorios
    generateRandomRecords(): void {
        const numberOfRecords = Math.floor(Math.random() * 8001) + 4000; // Entre 4000 y 12000 registros
        const batchUpdates: Book[] = Array.from({ length: numberOfRecords }, () => {
            const randomId = Math.floor(Math.random() * 10000);
            const randomTitle = 'Book ' + randomId;
            const randomAuthorId = Math.floor(Math.random() * 1000);
            const randomPublished = Math.random() < 0.5;
            const randomYear = Math.floor(Math.random() * 9) + 2015;
            const randomDescription = 'Description for Book ' + randomId;
            const randomDateCreated = new Date();
            return new Book(
                randomId,
                randomTitle,
                randomAuthorId,
                randomPublished,
                randomYear,
                randomDescription,
                randomDateCreated
            );
        });
        this.books.push(...batchUpdates);
        this.booksUpdated.next(this.books);
    }

    // Eliminar registros de más de 2 horas
    deleteOldRecords(): void {
        const twoHoursAgo = new Date();
        twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);
        this.books = this.books.filter(book => book.dateCreated > twoHoursAgo);
        this.booksUpdated.next(this.books);
    }

    // Eliminar registros de más de 5 segundos
    // deleteOldRecords(): void {
    //     const fiveSecondsAgo = new Date();
    //     fiveSecondsAgo.setSeconds(fiveSecondsAgo.getSeconds() - 5);
    //     this.books = this.books.filter(book => book.dateCreated > fiveSecondsAgo);
    //     this.booksUpdated.next(this.books);
    // }

    getBooksUpdatedListener() {
        return this.booksUpdated.asObservable();
    }
}
