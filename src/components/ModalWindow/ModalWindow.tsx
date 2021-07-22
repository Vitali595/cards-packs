// интерфейс для пропсов
import React, {ReactElement, useEffect} from "react";
import style from "./ModalWindow.module.css"

interface ModalProps {
    title: string
    content: ReactElement | string
    footer: ReactElement | string
    onClose: () => void
}

export const Modal = ({
                          title = '',
                          content = '',
                          footer = '',
                          onClose,
                      }: ModalProps) => {
    // создаем обработчик нажатия клавиши Esc
    const onKeydown = ({key}: KeyboardEvent) => {
        switch (key) {
            case 'Escape':
                onClose()
                break
        }
    }

    // c помощью useEffect цепляем обработчик к нажатию клавиш
    // https://ru.reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        document.addEventListener('keydown', onKeydown)
        return () => document.removeEventListener('keydown', onKeydown)
    })

    // или возвращаем верстку модального окна
    return (
        <React.Fragment>
            <div className={style.modal} onClick={onClose}>
                <div className={style.modalDialog} onClick={e => e.stopPropagation()}>
                    <div className={style.modalHeader}>
                        <h3 className={style.modalTitle}>{title}</h3>
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

// export const ModalWindow = () => {
//     const [isModal, setModal] = React.useState(false)
//     const onClose = () => setModal(false)
//     return (
//         <React.Fragment>
//             <button onClick={() => setModal(true)}>Клик-клик-клик</button>
//             <Modal
//                 visible={isModal}
//                 title='Заголовок'
//                 content={<p>Что-то важное</p>}
//                 footer={<div><button onClick={onClose}>Закрыть</button> <button onClick={onClose}>Закрыть</button></div>}
//                 onClose={onClose}
//             />
//         </React.Fragment>
//     )
// }