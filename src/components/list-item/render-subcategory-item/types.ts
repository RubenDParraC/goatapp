import type { SubCategoriesType } from "../../../statics/types-backend";

export type RenderSubcategoryItemProps = {
  index: number;
  item: SubCategoriesType;
  onClick: () => void;
};
