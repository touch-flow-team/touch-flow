import { format, getMonth } from "date-fns";
import HistoryModal from "./HistoryModal";
import { History } from "@/types/companies/calendar/type";

interface CalendarViewProps {
    createMonth: Date[][];
    currentDate: Date;
    MOCK_DATA: { [key: string]: History[] };
}


const CalendarView: React.FC<CalendarViewProps> = ({ createMonth, currentDate, MOCK_DATA }) => {
    return (
        <div>
            {createMonth.map((week, weekIndex) => (
                <div key={weekIndex} className="flex justify-between">
                    {week.map((date, dateIndex) => {
                        const isCurrentMonth = getMonth(date) === getMonth(currentDate);
                        const isToday = format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
                        let DAY_REVENUE: number | null = null; // Initialize DAY_REVENUE as null

                        const dayKey = format(date, 'dd'); // Correct use of the date variable
                        if (isCurrentMonth && MOCK_DATA[dayKey]) {
                            DAY_REVENUE = MOCK_DATA[dayKey].reduce(
                                (total, item) => total + item?.amount,
                                0,
                            );
                        }
                        return (
                            <HistoryModal
                                key={dateIndex}
                                DAY_REVENUE={DAY_REVENUE}
                                isCurrentMonth={isCurrentMonth}
                                isToday={isToday}
                                date={date}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default CalendarView;
