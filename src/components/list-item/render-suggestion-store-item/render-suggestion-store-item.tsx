import SuggestionStore from "../../suggestion-store/suggestion-store";
import type { RenderSuggestionStoreItemProps } from "./types";

const RenderSuggestionStoreItem = ({
  item,
  onClick,
}: RenderSuggestionStoreItemProps) => {
  return <SuggestionStore item={item} onClick={onClick} />;
};

export default RenderSuggestionStoreItem;
