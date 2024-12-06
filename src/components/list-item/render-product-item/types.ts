import type { ProductType } from "../../../statics/types-backend";

export type RenderProductItemProps = {
  item: ProductType;
  isHorizontal?: boolean;
  onClick: () => void;
  onClickCartShop: () => void;
};
