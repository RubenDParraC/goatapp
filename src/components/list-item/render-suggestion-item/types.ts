import type { SuggestionType } from "../../../statics/types-backend";

export type RenderSuggestionItemProps = {
  item: SuggestionType;
  onClick: () => void;
};
