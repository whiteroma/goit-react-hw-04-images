import { useState } from 'react';

export const useToggleModal = () => {
  const [showModal, setShowModal] = useState(false);
  const open = () => setShowModal(true);
  const close = () => setShowModal(false);
  const toggle = () => setShowModal(showModal => !showModal);

  return { showModal, open, close, toggle };
};
