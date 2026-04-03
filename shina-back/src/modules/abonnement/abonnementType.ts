import { BaseTypes } from  "@/common/models/base.model";
import { PlanAbonnementEnum} from "@/database/enums/planAbonnementEnum";

export type AbonnementReponse = BaseTypes & {
    planAbonnement: PlanAbonnementEnum;
    nombreMaxProprietes: number;
    nombreMaxUnitLocation: number;
    label: string;
    prix: number;
    duree: number;
    detail: string;
    other: JSON;

};

