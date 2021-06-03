import {getMongoRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Student} from "../entity/Student";
import {Book} from "../entity/Book";

export class StudentController {

    private StudentRepository = getMongoRepository(Student);

    async all(request: Request, response: Response, next: NextFunction) {
       // Functionality for sorting and pagination
        const sortByColumn = request.query.sort_column || 'Name';
        const sortOrder = request.query.sort_by || 'ASC';
        const page = parseInt(request.query.page) || 0;
        const perPage = parseInt(request.query.perPage) || 10;

        return this.StudentRepository.find({order:{[sortByColumn]:sortOrder},skip:page*perPage,take:perPage});
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.StudentRepository.findOne(request.params.id);
    }

    async createBook(request: Request, response: Response, next: NextFunction) {
        let StudentToUpdate = await this.StudentRepository.findOne(request.params.id);
        const {id,name,authour} = request.body; 
       if(StudentToUpdate)
       {
        StudentToUpdate.Books.push(new Book(id,name,authour));
        const res = await this.StudentRepository.update(request.params.id,StudentToUpdate);
        return StudentToUpdate;
       }
    }
}