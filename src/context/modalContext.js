import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

export const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
  const [Modal, setModal] = useState(false);
  const router = useRouter();

  const closeModal = () => {
    const body = document.getElementsByTagName("body")[0];
    body.style.overflowY = "auto";
    setModal(false);
  };

  const showModal = (modal) => {
    const body = document.getElementsByTagName("body")[0];
    body.style.overflowY = "hidden";
    setModal(modal);
  };

  useEffect(() => {
    closeModal();
  }, [router.route]);

  return (
    <ModalContext.Provider value={[showModal, closeModal]}>
      {Modal}
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  return useContext(ModalContext);
};
