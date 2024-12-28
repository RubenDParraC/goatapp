import React from "react";
import type { RenderCategoryItemProps } from "./types";
import Categorie from "../../categorie/categorie";

const RenderCategoryItem = ({
  index,
  item,
  onClick,
}: RenderCategoryItemProps) => {
  return <Categorie index={index} item={item} onClick={onClick} />;
};

export default RenderCategoryItem;
