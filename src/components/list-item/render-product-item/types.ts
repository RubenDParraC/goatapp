import type { ProductType } from "../../../statics/types-backend";

export type RenderProductItemProps = {
  index: number;
  item: ProductType;
  isHorizontal?: boolean;
  onClick: () => void;
  onClickCartShop: () => void;
};
