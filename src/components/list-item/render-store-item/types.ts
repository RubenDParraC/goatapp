import type { StoreType } from "../../../statics/types-backend";

export type RenderStoreItemProps = {
  item: StoreType;
  onClickStore: () => void;
};
