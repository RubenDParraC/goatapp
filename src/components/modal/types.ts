import type { ReactNode } from "react";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import type { colors } from "../icon-component/utils";

export type ModalProps = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  bottomSheetModalRef: React.ForwardedRef<BottomSheetModal<any>>;
  snapPoints: string[];
  enablePanDownToClose?: boolean;
  exteriorBackgorundColor?: keyof typeof colors;
  children: ReactNode;
  className?: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
