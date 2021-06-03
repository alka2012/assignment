import { ObjectIdColumn, Column} from "typeorm";

export class Book {
    @Column() 
    bookId: string;
    
    @Column()
    bookName: string;

    @Column()
    bookAuthour: string;

    constructor(id: string, name: string, authour: string) {
        this.bookId = id;
        this.bookName = name;
        this.bookAuthour = authour;
    }
}