import type { colors } from "../icon-component/utils";

export type LoaderProps = {
  size?: "small" | "large";
  color?: keyof typeof colors;
};
