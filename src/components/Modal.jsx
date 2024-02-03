import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

import css from './styles.module.css';

const modalRoot = document.getElementById('modal-root');

export const Modal = ({ close, children }) => {
  const closeModal = useCallback(
    ({ target, currentTarget, code }) => {
      if (target === currentTarget || code === 'Escape') {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    document.addEventListener('keydown', closeModal);

    return () => document.removeEventListener('keydown', closeModal);
  }, [closeModal]);
  return createPortal(
    <div className={css.overlay} onClick={closeModal}>
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

// export const Modal = ({ close, children }) => {
//   const closeModal = ({ target, currentTarget, code }) => {
//     if (target === currentTarget || code === 'Escape') {
//       close();
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('keydown', closeModal);

//     return () => document.removeEventListener('keydown', closeModal);
//   }, [close]);
