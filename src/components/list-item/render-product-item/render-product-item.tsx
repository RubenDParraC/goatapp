import React from "react";
import type { RenderProductItemProps } from "./types";
import Product from "../../product/product";

const RenderProductItem = ({
  item,
  isHorizontal,
  onClick,
  onClickCartShop,
}: RenderProductItemProps) => {
  const { id } = item;
  return (
    <Product
      item={item}
      onClick={onClick}
      onClickCartShop={onClickCartShop}
      isHorizontal={isHorizontal}
    />
  );
};

export default RenderProductItem;
