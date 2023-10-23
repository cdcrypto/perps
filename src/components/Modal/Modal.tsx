import {
  CloseIcon,
  CompulsoryDialog,
  Dialog,
  DialogContainer,
  ModalBackdrop,
  ModalContainer,
  PortalWrapper,
} from "./styles";
import { useOnClickOutside } from "./useOnClickOutside";
import { createPortal } from "react-dom";
import { useTransition } from "@react-spring/web";
import { useEffect } from "react";
import { DialogContentWrapper } from "./Dialog";
import { DefaultTheme } from "styled-components";

export interface ModalProps {
  /** content displayed on the Dialog */
  children?: React.ReactNode;
  /** opened or closed state of the Dialog  */
  open: boolean;
  /** Function to handle closing the Dialog
   * This can be undefined if you wish to change how the modal can be closed.
   * (For example, having a close button on the Dialog itself)
   * Currently it can be closed simply by clicking anywhere outside the Dialog  */
  onClose?: () => void;
  /**
   * If true, the Dialog will take up the entire screen with no transparency
   */
  fullScreen?: boolean;
  /**
   * Title text for the Dialog
   */
  title?: React.ReactNode;
  /** Passed to Dialog component for styling of the Dialog */
  className?: string;

  /** If true, the Dialog will close when the escape key is pressed. False by default */
  closeByEsc?: boolean;
  /**
   * Function to get the background color of the backdrop
   */
  getBackdropBackgroundColor?: (theme: DefaultTheme) => string;
}

export const Modal = ({
  open,
  onClose,
  children,
  fullScreen,
  title,
  className,
  closeByEsc,
  getBackdropBackgroundColor,
}: ModalProps): JSX.Element => {
  const dialogRef = useOnClickOutside(() => {
    if (onClose) {
      onClose();
    }
  });

  const transitions = useTransition(open, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  /**
   * Prevent scrolling on the body when the modal is open
   */
  useEffect(() => {
    if (open || !onClose) {
      document.body.style.setProperty("overflow", "hidden");
    } else {
      document.body.style.setProperty("overflow", "auto");
    }
  }, [onClose, open]);

  useEffect(() => {
    if (closeByEsc) {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose && onClose();
        }
      };

      document.addEventListener("keydown", handleEsc);

      return () => {
        document.removeEventListener("keydown", handleEsc);
      };
    }
  }, [closeByEsc, onClose]);

  return transitions(
    (style, item) =>
      item && (
        <PortalWrapper>
          {createPortal(
            onClose ? (
              <ModalContainer>
                {fullScreen && !!onClose && (
                  <CloseIcon size={32} onClick={onClose} />
                )}
                <ModalBackdrop
                  style={style}
                  $getBackgroundColor={getBackdropBackgroundColor}
                />
                <DialogContainer>
                  <Dialog
                    ref={dialogRef}
                    className={className}
                    style={style}
                    $showBg={!fullScreen}
                  >
                    <DialogContentWrapper title={title}>
                      {children}
                    </DialogContentWrapper>
                  </Dialog>
                </DialogContainer>
              </ModalContainer>
            ) : (
              <ModalContainer>
                <ModalBackdrop
                  style={style}
                  $getBackgroundColor={getBackdropBackgroundColor}
                />
                <DialogContainer>
                  <CompulsoryDialog
                    ref={dialogRef}
                    className={className}
                    style={style}
                  >
                    <DialogContentWrapper title={title}>
                      {children}
                    </DialogContentWrapper>
                  </CompulsoryDialog>
                </DialogContainer>
              </ModalContainer>
            ),
            document.body
          )}
        </PortalWrapper>
      )
  );
};
