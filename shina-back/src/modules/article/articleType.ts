import { BaseTypes } from  "@/common/models/base.model";

export type ArticleResponse = BaseTypes & {
    titre: string,
    prix: number,
    quantite: number

};

