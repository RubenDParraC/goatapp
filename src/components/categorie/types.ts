import type { CategoriesType } from "../../statics/types-backend";

export type CategorieProps = {
  index?: number;
  item: CategoriesType;
  onClick: () => void;
};
