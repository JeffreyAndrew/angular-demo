import { Author } from "../entities/author.model";
import { Book } from "../entities/book.model";

export const initialBooks = [
    new Book(1, 'Book 1', 1, true, 2022, 'Description for Book 1', new Date()),
    new Book(2, 'Book 2', 2, true, 2022, 'Description for Book 2', new Date()),
    new Book(3, 'Book 3', 2, true, 2023, 'Description for Book 3', new Date()),
    new Book(4, 'Book 4', 2, false, 2023, 'Description for Book 4', new Date()),
    new Book(5, 'Book 5', 2, false, 2023, 'Description for Book 5', new Date()),
    new Book(6, 'Book 6', 2, false, 2023, 'Description for Book 6', new Date()),
    new Book(7, 'Book 7', 2, false, 2023, 'Description for Book 7', new Date()),
    new Book(8, 'Book 8', 2, false, 2022, 'Description for Book 8', new Date()),
    new Book(9, 'Book 9', 2, false, 2021, 'Description for Book 9', new Date()),
    new Book(10, 'Book 10', 2, false, 2021, 'Description for Book 10', new Date()),
];

export const initialAuthors: Author[] = [
    new Author(1, 'Author 1', 'Male'),
    new Author(2, 'Author 2', 'Female'),
    new Author(3, 'Author 3', 'Male'),
];
