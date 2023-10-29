export class Book {
    id: number;
    title: string;
    authorId: number;
    published: boolean;
    year: number;
    description: string;
    dateCreated: Date;

    constructor(
        id: number,
        title: string,
        authorId: number,
        published: boolean,
        year: number,
        description: string,
        dateCreated: Date
    ) {
        this.id = id;
        this.title = title;
        this.authorId = authorId;
        this.published = published;
        this.year = year;
        this.description = description;
        this.dateCreated = dateCreated;
    }
}
