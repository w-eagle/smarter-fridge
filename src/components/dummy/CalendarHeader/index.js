import styles from "./styles.module.css";
import arrowUp from "../../../../public/arrow-up.svg";

export const CalendarHeader = ({ handlePrev, handleNext, displayedDate }) => (
    <div className={styles.headerWrapper}>
        {handlePrev ? (
            <div onClick={handlePrev} className={styles.arrowWrapper}>
                <img src={arrowUp.src} className={`${styles.arrow} ${styles.leftArrow}`} />
            </div>
        ) : (
            <div />
        )}
        <p className={styles.displayedDate}>{displayedDate}</p>
        {handleNext ? (
            <div onClick={handleNext}>
                <img src={arrowUp.src} className={styles.arrow} />
            </div>
        ) : (
            <div />
        )}
    </div>
);
