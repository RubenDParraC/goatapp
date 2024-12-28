import type { SubCategoriesType } from "../../statics/types-backend";

export type SubcategorieProps = {
  index?: number;
  item: SubCategoriesType;
  onClick: () => void;
};
