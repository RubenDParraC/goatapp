import type { CategoriesType } from "../../statics/types-backend";

export type CategorieProps = {
  item: CategoriesType;
  onClick: () => void;
};
