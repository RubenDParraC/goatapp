import type { CategoriesType } from "../../../statics/types-backend";

export type RenderCategoryItemProps = {
  item: CategoriesType;
  onClick: () => void;
};
