import React from "react";
import type { RenderSubcategoryItemProps } from "./types";
import Subcategorie from "../../subcategorie/subcategorie";

const RenderSubcategoryItem = ({
  index,
  item,
  onClick,
}: RenderSubcategoryItemProps) => {
  return <Subcategorie index={index} item={item} onClick={onClick} />;
};

export default RenderSubcategoryItem;
