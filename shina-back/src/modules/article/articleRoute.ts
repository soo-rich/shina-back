import {Router} from "express";
import { ArticleController } from "./articleController";
import validate from "../middleware/validate.middleware";
import { createSchema, updateSchema, articleIdSchema } from "./articleSchema";
import { defaultPaginationQuery} from "@common/api.schema";


const router: Router = Router();
const articleController = new ArticleController();

// create article
router.post('/',  validate(createSchema, 'body'), articleController.create);

// get all articles paginated
router.get('/',    validate({query: defaultPaginationQuery}), articleController.findAllPaginated);

// get article by id
router.get('/:id', validate({ params: articleIdSchema }), articleController.findById);

// update articles by id
router.patch('/:id', validate({
    params: articleIdSchema,
    body: updateSchema,
}), articleController.update);



// delete articles by id
router.delete('/:id', validate({ params: articleIdSchema }) ,articleController.delete);

export default router;




