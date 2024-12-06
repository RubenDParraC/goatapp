import React from "react";
import type { RenderSubcategoryItemProps } from "./types";
import Subcategorie from "../../subcategorie/subcategorie";

const RenderSubcategoryItem = ({
  item,
  onClick,
}: RenderSubcategoryItemProps) => {
  return <Subcategorie item={item} onClick={onClick} />;
};

export default RenderSubcategoryItem;
