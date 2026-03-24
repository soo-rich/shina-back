import {Router} from "express";
import { AbonnementController } from "./abonnementController";
import validate from "../middleware/validate.middleware";
import { createSchema, updateSchema, abonnementIdSchema } from "./abonnementSchema";
import { defaultPaginationQuery} from "@common/api.schema";


const router: Router = Router();
const abonnementController = new AbonnementController();

// get all subscriptions paginated

router.get('/',    validate({query: defaultPaginationQuery}), abonnementController.findAllPaginated);//validate({body: abonnementsSchema}),

// get subscription by id
router.get('/:id', validate({ params: abonnementIdSchema }), abonnementController.findById);


// update subscription by id
router.patch('/:id', validate({
    params: abonnementIdSchema,
    body: updateSchema,
}), abonnementController.update);

// create subscription
router.post('',  validate({ body: createSchema }), abonnementController.create);

// delete subscription by id
router.delete('/:id', validate({ params: abonnementIdSchema }) ,abonnementController.delete);

export default router;




