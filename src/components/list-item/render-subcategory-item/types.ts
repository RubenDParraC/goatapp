import type { SubCategoriesType } from "../../../statics/types-backend";

export type RenderSubcategoryItemProps = {
  item: SubCategoriesType;
  onClick: () => void;
};
