import React from "react";
import { View, FlatList } from "react-native";
import Separator from "../../../../../components/separator/separator";
import type { SearchTextScreenNavigationProp } from "../../types";
import { useNavigation } from "@react-navigation/native";
import type { HeaderComponentProps } from "./types";
import RenderSuggestionStoreItem from "../../../../../components/list-item/render-suggestion-store-item/render-suggestion-store-item";

const HeaderComponent = ({
  suggestionStores,
  visibleSeparator = true,
}: HeaderComponentProps) => {
  const navigation = useNavigation<SearchTextScreenNavigationProp>();
  return (
    <View>
      <FlatList
        data={suggestionStores}
        renderItem={({ item }) => (
          <RenderSuggestionStoreItem
            item={item}
            onClick={() =>
              item.id &&
              navigation.navigate("StoreDetails", {
                storeID: item.id.toString(),
              })
            }
          />
        )}
        keyExtractor={(_, index) => `suggestion-store-${+index}`}
        showsHorizontalScrollIndicator={false}
      />
      {visibleSeparator ? (
        <Separator color={"gray_hard"} className="my-5" />
      ) : null}
    </View>
  );
};

export default HeaderComponent;
