import type { SuggestionStoreType } from "../../../../../statics/types-backend";

export type HeaderComponentProps = {
  suggestionStores: SuggestionStoreType[];
  visibleSeparator?: boolean;
};
