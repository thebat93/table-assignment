import { ReactNode, useEffect, useRef } from "react";
import { FaXmark } from "react-icons/fa6";

import s from "./Dialog.module.css";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Dialog = ({ isOpen, onClose, children }: DialogProps) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (modalRef.current) {
      if (isOpen) {
        modalRef.current.showModal();
      } else {
        modalRef.current.close();
      }
    }
  }, [isOpen]);

  return (
    <dialog ref={modalRef} onClose={onClose} className={s.dialog}>
      <span className={s.closeIcon}>
        <FaXmark onClick={onClose} />
      </span>
      <div>{children}</div>
    </dialog>
  );
};

export { Dialog };
