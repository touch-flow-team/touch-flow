import { useState } from 'react';

type ModalType = 'update' | 'delete' | null;

interface ModalInfo {
  isOpen: boolean;
  type: ModalType;
  id: string | null;
}

const useModalState = () => {
  const [modalInfo, setModalInfo] = useState<ModalInfo>({ isOpen: false, type: null, id: null });

  const openModal = (type: ModalType, id: string) => {
    setModalInfo({
      isOpen: true,
      type,
      id,
    });
  };

  const closeModal = () => {
    setModalInfo({
      isOpen: false,
      type: null,
      id: null,
    });
  };

  return { modalInfo, openModal, closeModal };
};

export default useModalState;
