import Suggestion from "../../suggestion/suggestion";
import type { RenderSuggestionItemProps } from "./types";

const RenderSuggestionItem = ({ item, onClick }: RenderSuggestionItemProps) => {
  return <Suggestion item={item} onClick={onClick} />;
};

export default RenderSuggestionItem;
