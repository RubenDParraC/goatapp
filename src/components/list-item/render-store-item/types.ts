import type { StoreType } from "../../../statics/types-backend";

export type RenderStoreItemProps = {
  index: number;
  item: StoreType;
  onClickStore: () => void;
  onClickProduct: (productId: number | string) => void;
};
