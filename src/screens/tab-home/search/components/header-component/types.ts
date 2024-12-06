import type { SubCategoriesType } from "../../../../../statics/types-backend";

export type HeaderComponentProps = {
  searchName: string;
  subcategories: SubCategoriesType[] | undefined;
  handleSubcategoryChange: (subcategory: SubCategoriesType) => void;
};
