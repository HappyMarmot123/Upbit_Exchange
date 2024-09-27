import { useCallback } from "react";
import Button from "./button";
import ModalWrapper from "./ModalWrapper";

interface PropType {
  title: string;
  content: string;
  confirm?: boolean;
  handleNext?: () => void;
  closeModal: () => void;
}

const ModalPopup = ({
  title,
  content,
  confirm,
  handleNext,
  closeModal,
}: PropType) => {
  const close = useCallback(() => {
    if (closeModal) {
      closeModal();
    }
  }, []);

  const agree = useCallback(() => {
    if (handleNext) {
      handleNext();
    }
  }, []);

  const modalStyle = {};

  return (
    <ModalWrapper modalStyle={modalStyle}>
      <div
        className="title"
        style={{ paddingBottom: "10px", fontSize: "20px" }}
      >
        {title}
      </div>
      <div className="title" style={{ fontSize: "14px" }}>
        {content}
      </div>
      <div style={{ display: "flex", gap: "15px" }}>
        {confirm ? (
          <>
            <Button
              text={`확인`}
              onClick={agree}
              buttonStyle={{ marginTop: "30px" }}
            ></Button>
            <Button
              text={`취소`}
              onClick={close}
              buttonStyle={{ marginTop: "30px" }}
            ></Button>
          </>
        ) : (
          <Button
            text={`확인`}
            onClick={close}
            buttonStyle={{ marginTop: "30px" }}
          ></Button>
        )}
      </div>
    </ModalWrapper>
  );
};

export default ModalPopup;
