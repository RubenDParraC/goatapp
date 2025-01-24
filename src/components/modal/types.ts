import type { ReactNode } from "react";

export type ModalProps = {
  snapPoint: number;
  isOpen: boolean;
  enablePanDownToClose?: boolean;
  children: ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
