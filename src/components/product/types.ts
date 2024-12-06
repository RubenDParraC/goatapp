import type { ProductType } from "../../statics/types-backend";

export type ProductProps = {
  item: ProductType;
  isHorizontal?: boolean;
  onClick: () => void;
  onClickCartShop: () => void;
};
