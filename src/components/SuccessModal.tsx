import { useEffect } from 'react';
import cancelIcon from '../assets/icons/cancel.png';
import successCheckIcon from '../assets/icons/success-check-icon.png';
import styles from './SuccessModal.module.scss';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessModal = ({ isOpen, onClose }: SuccessModalProps) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timer = window.setTimeout(onClose, 4000);
    return () => window.clearTimeout(timer);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={styles.overlay}
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className={styles.card} role="dialog" aria-modal="true" aria-label="Изменения сохранены">
        <button className={styles.close} type="button" onClick={onClose} aria-label="Закрыть">
          <img className={styles.closeIcon} src={cancelIcon} alt="" aria-hidden="true" />
        </button>
        <div className={styles.icon} aria-hidden="true">
          <img className={styles.iconImage} src={successCheckIcon} alt="" />
        </div>
        <p className={styles.text}>Изменения сохранены!</p>
      </div>
    </div>
  );
};
