import React from "react";
import styles from "./styles.module.css";
import dayjs from "dayjs";

const getCellClass = (cellDate, selectedStartDate) => {
    if (selectedStartDate.isValid() && cellDate.isSame(selectedStartDate)) {
        return styles.selectedStartCellWithoutEndDate;
    }
    return;
};

const numberOfDays = Array(7).fill(undefined);
const numberOfRows = Array(6).fill(undefined);

const dayNames = numberOfDays.map((_, index) => {
    return new Date(2022, 7, index).toLocaleString("en-GB", {
        weekday: "short"
    });
});

const daysInMonth = (iMonth, iYear) => 31 - new Date(iYear, iMonth, 32).getDate();

export const Calendar = ({
    currentDate,
    displayedYear,
    displayedMonth,
    selectedStartDate,
    onDateSelect
}) => {
    let startDate = 0;

    let firstDay = new Date(displayedYear, displayedMonth).getDay();

    return (
        <div className={styles.calendarWrapper}>
            <div className={styles.card}>
                <table className={`${styles.table}`} id="calendar">
                    <thead>
                        <tr>
                            {dayNames.map((day) => (
                                <th
                                    key={`calendar_header_${displayedMonth}_${displayedYear}_${day}`}
                                    className={`${styles.headerCell} font-normal`}
                                >
                                    {day}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {numberOfRows.map((_, rowIndex) => (
                            <tr key={`calendarRow_${displayedMonth}_${rowIndex}`}>
                                {numberOfDays.map((_, dayIndex) => {
                                    // empty cell
                                    if (rowIndex === 0 && dayIndex < firstDay) {
                                        return (
                                            <td
                                                key={`calendarEmptyCell_${displayedMonth}_${dayIndex}`}
                                                className={styles.rowCell}
                                            ></td>
                                        );
                                    }
                                    // empty cell
                                    if (startDate > daysInMonth(displayedMonth, displayedYear)) {
                                        return null;
                                    }
                                    startDate += 1;
                                    const cellDate = startDate;
                                    // todays cell
                                    if (
                                        cellDate === currentDate.date() &&
                                        displayedYear === currentDate.year() &&
                                        displayedMonth === currentDate.month()
                                    ) {
                                        return (
                                            <td
                                                id={`calendarDayCell_${displayedMonth}_${dayIndex}_${cellDate}`}
                                                key={`calendarTodayCell_${displayedMonth}_${dayIndex}_${cellDate}`}
                                                className={`${styles.rowCell} ${
                                                    styles.todayCell
                                                } ${getCellClass(
                                                    dayjs(
                                                        `${displayedYear}-${
                                                            displayedMonth + 1
                                                        }-${cellDate}`
                                                    ),
                                                    dayjs(selectedStartDate)
                                                )}`}
                                                onClick={() => {
                                                    onDateSelect(
                                                        dayjs(
                                                            `${displayedYear}-${
                                                                displayedMonth + 1
                                                            }-${cellDate}`
                                                        )
                                                    );
                                                }}
                                            >
                                                {cellDate}
                                            </td>
                                        );
                                    }
                                    // selectable cell
                                    return (
                                        <td
                                            key={`calendarDayCell_${displayedMonth}_${dayIndex}_${cellDate}`}
                                            onClick={() => {
                                                onDateSelect(
                                                    dayjs(
                                                        `${displayedYear}-${
                                                            displayedMonth + 1
                                                        }-${cellDate}`
                                                    )
                                                );
                                            }}
                                            className={`${styles.rowCell} ${
                                                styles.pointer
                                            } ${getCellClass(
                                                dayjs(
                                                    `${displayedYear}-${
                                                        displayedMonth + 1
                                                    }-${cellDate}`
                                                ),
                                                dayjs(selectedStartDate)
                                            )}`}
                                        >
                                            {cellDate}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br />
            </div>
        </div>
    );
};
