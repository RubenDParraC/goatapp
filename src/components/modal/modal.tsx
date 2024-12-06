import React from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import type { ModalProps } from "./types";
import { colors } from "../icon-component/utils";

const Modal = ({
  bottomSheetModalRef,
  snapPoints,
  enablePanDownToClose = true,
  setIsOpen,
  children,
  className,
  exteriorBackgorundColor = "black",
}: ModalProps) => {
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        enablePanDownToClose={enablePanDownToClose}
        containerStyle={{
          backgroundColor: `${colors[exteriorBackgorundColor]}50`,
        }}
        onDismiss={() => setIsOpen(false)}
      >
        <BottomSheetView
          className={`flex flex-1 w-[90%] items-center justify-center bg-white self-center ${className}`}
        >
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default Modal;
