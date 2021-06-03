import "reflect-metadata";
import { createConnection, getMongoManager } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import { Student } from "./entity/Student";
import { Book } from "./entity/Book";
import Joi = require("joi");
import { ErrorHandler } from "./helpers/ErrorHandler";
import { error } from "winston";
createConnection()
  .then(async (connection) => {
    // create express app
    const app = express();
    app.use(bodyParser.json());
    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          var valid;
          if (route.validate) {
            const { error, value } = route.validate.validate(
              req.body
            ) as Joi.ValidationResult;
            valid = error;
          }
          if (valid) {
            res.status(403).json(valid.details);
          } else {
            const result = new (route.controller as any)()[route.action](
              req,
              res,
              next
            );
            if (result instanceof Promise) {
              result
                .then((result) => {
                  if (result !== null && result !== undefined) {
                    res.status(200).json({ success: true, data: result });
                  } else {
                    throw new ErrorHandler(401, "Unable to process request");
                  }
                })
                .catch((error) => {
                  throw new ErrorHandler(401, error.log);
                });
            } else if (result !== null && result !== undefined) {
              res.json(result);
            }
          }
        }
      );
    });

    // setup express app here
    // ...

    // start express server
    app.listen(3000);

    const manager = getMongoManager();
    const student = new Student();
    student.Name = "Saw";
    student.Country = "England";
    student.Age = 20;
    student.Books = [
      new Book("1111", "Life Of Pi", "unknown"),
      new Book("21", "Ekigai", "Japanease"),
    ];
    // insert new users for test
    await manager.save(student);
    const student1 = new Student();
    student1.Country = "England";
    student1.Name = "Alka";
    student1.Age = 12;
    await manager.save(student1);

    console.log(
      "Express server has started on port 3000. Open http://localhost:3000/students to see results"
    );
  })

  .catch((error) => {
    throw new ErrorHandler(500, "unable to connect");
  });
