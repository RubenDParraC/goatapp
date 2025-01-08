// types
import type { LocationType } from "../../../statics/types-backend";

export type RenderLocationItemProps = {
  index: number;
  item: LocationType;
  onClickDelete: (locationId: string) => void;
  onClickUpdate: (location: LocationType) => void;
};
