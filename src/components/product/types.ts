import type { ProductType } from "../../statics/types-backend";

export type ProductProps = {
  index?: number;
  item: ProductType;
  isHorizontal?: boolean;
  onClick: () => void;
  onClickCartShop: () => void;
};
