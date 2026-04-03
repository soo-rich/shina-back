import { Router } from "express";
import { ToDoController } from "./toDoController";
import validate from "../middleware/validate.middleware";
import { createSchema, updateSchema, toDoIdSchema } from "./toDoSchema";
import { defaultPaginationQuery } from "@common/api.schema";

const router: Router = Router();
const toDoController = new ToDoController();

// create todo
router.post('/', validate(createSchema, 'body'), toDoController.create);

// get all todos paginated
router.get('/', validate({ query: defaultPaginationQuery }), toDoController.findAllPaginated);

// get todo by id
router.get('/:id', validate({ params: toDoIdSchema }), toDoController.findById);

// update todo by id
router.patch('/:id', validate({
    params: toDoIdSchema,
    body: updateSchema,
}), toDoController.update);

// delete todo by id
router.delete('/:id', validate({ params: toDoIdSchema }), toDoController.delete);

//complete
router.patch('/:id/complete', validate({ params: toDoIdSchema}), toDoController.complete)


export default router;