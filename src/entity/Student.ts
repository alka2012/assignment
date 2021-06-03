import {Entity, ObjectID, ObjectIdColumn, Column} from "typeorm"; 
import { Book } from "./Book";

@Entity() 
export class Student {  

   @ObjectIdColumn() 
   id: ObjectID; 
   
   @Column() 
   Name: string; 
   
   @Column() 
   Country: string; 

   @Column() 
   Age: number; 

   @Column(type => Book)
    Books: Book[];
}