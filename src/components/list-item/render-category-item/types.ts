import type { CategoriesType } from "../../../statics/types-backend";

export type RenderCategoryItemProps = {
  index: number;
  item: CategoriesType;
  onClick: () => void;
};
