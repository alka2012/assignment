import {StudentController} from "./controller/StudentController";
import { BooksSchema}  from "./schemas";
export const Routes = [{
    method: "get",
    route: "/students",
    controller: StudentController,
    action: "all"
}, {
    method: "get",
    route: "/students/:id",
    controller: StudentController,
    action: "one"
}, {
    method: "post",
    route: "/students/:id/book",
    controller: StudentController,
    action: "createBook",
    validate:BooksSchema
}, {
    method: "delete",
    route: "/students/:id",
    controller: StudentController,
    action: "remove"
}];
