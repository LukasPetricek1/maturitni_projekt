import {
  MutableRefObject,
  ReactElement,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect
} from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  ref: MutableRefObject<null>;
  children: ReactElement;
  confirmText?: string;
  cancelText?: string;
  instant? : boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface DialogHandle {
  open: () => void;
  close: () => void;
}

const Modal = forwardRef<DialogHandle, ModalProps>(
  ({ children, confirmText, cancelText, onConfirm, onCancel , instant }, ref) => {
    const dialog = useRef<HTMLDialogElement>(null);

    useEffect(() => { 
      if(instant){
        setTimeout(() => {
          dialog.current!.showModal()
          document.body.style.overflowY = "hidden"
        }, 2000);
      }
    } , [instant])

    useImperativeHandle(ref, () => ({
      open: () => {
        dialog.current!.showModal();
      },
      close: () => {
        dialog.current!.close();
      },
    }));
    return createPortal(
      <>
        <dialog
          ref={dialog}
          className="rounded-lg shadow-2xl shadow-black p-6 bg-gray-100 text-center text-gray-800 w-64"
        >
          {children}
          <div className="flex justify-around">
            <button
              className="px-4 py-2 text-blue-500 hover:text-primary-blue"
              onClick={onCancel}
            >
              {cancelText}
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-primary-blue"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </dialog>
      </>,
      document.getElementById("root-modal")!
    );
  }
);

export default Modal;
