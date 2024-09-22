import React from "react";
import cx from "classnames";

interface FullPopupProps {
  children?: React.ReactNode;
  modalStyle?: any;
}

const ModalWrapper = ({ children, modalStyle }: FullPopupProps) => {
  return (
    <div className="modal-bg" style={{ backgroundColor: "white", left: "0" }}>
      <div
        className={cx("dialog_wrap is_open")}
        style={{ zIndex: "999", backgroundColor: "unset" }}
      >
        <div
          className="dialog_inner"
          style={{ padding: "30px", ...modalStyle }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;
