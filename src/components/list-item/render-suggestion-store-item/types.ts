import type { SuggestionStoreType } from "../../../statics/types-backend";

export type RenderSuggestionStoreItemProps = {
  item: SuggestionStoreType;
  onClick: () => void;
};
