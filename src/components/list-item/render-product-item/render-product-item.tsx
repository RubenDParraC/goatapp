import React from "react";
import type { RenderProductItemProps } from "./types";
import Product from "../../product/product";

const RenderProductItem = ({
  index,
  item,
  isHorizontal,
  onClick,
  onClickCartShop,
}: RenderProductItemProps) => {
  const { id } = item;
  return (
    <Product
      index={index}
      item={item}
      onClick={onClick}
      onClickCartShop={onClickCartShop}
      isHorizontal={isHorizontal}
    />
  );
};

export default RenderProductItem;
