import React from "react";
import type { RenderCategoryItemProps } from "./types";
import Categorie from "../../categorie/categorie";

const RenderCategoryItem = ({ item, onClick }: RenderCategoryItemProps) => {
  return <Categorie item={item} onClick={onClick} />;
};

export default RenderCategoryItem;
