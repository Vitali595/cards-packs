import React, {ReactElement, useEffect} from "react";
import style from "./ModalWindow.module.css"

interface ModalProps {
    title: string
    content: ReactElement | string
    footer: ReactElement | string
    onClose: () => void
}

export const Modal = ({
                          title = "",
                          content = "",
                          footer = "",
                          onClose,
                      }: ModalProps) => {

    const onKeydown = ({key}: KeyboardEvent) => {
        switch (key) {
            case "Escape":
                onClose()
                break
        }
    }


    useEffect(() => {
        document.addEventListener("keydown", onKeydown)
        return () => document.removeEventListener("keydown", onKeydown)
    })


    return (
        <React.Fragment>
            <div className={style.modal} onClick={onClose}>
                <div className={style.modalDialog} onClick={e => e.stopPropagation()}>
                    <div className={style.modalHeader}>
                        <div className={style.modalTitle}>{title}</div>
                        <span className={style.modalClose} onClick={onClose}>
            &times;
          </span>
                    </div>
                    <div className={style.modalBody}>
                        <div className={style.modalContent}>{content}</div>
                    </div>
                    {footer && <div className={style.modalFooter}>{footer}</div>}
                </div>
            </div>
        </React.Fragment>
    )
}