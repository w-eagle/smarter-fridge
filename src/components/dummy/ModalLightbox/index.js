import styles from "./styles.module.css";

export const ModalLightbox = ({ children, handleClickAway }) => {
    return (
        <div
            className={`${styles.container} w-full h-full animated absolute top-0 left-0 z-[110] flex justify-center pt-[20px]`}
            onClick={(e) => {
                e.stopPropagation();
                handleClickAway();
            }}
        >
            {children}
        </div>
    );
};
