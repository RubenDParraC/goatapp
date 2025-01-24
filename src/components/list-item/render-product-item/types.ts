import type { ProductType } from "../../../statics/types-backend";

export type RenderProductItemProps = {
  index: number;
  item: ProductType;
  isHorizontal?: boolean;
  onClick: (productId: number | string) => void;
  onClickCartShop: () => void;
};
