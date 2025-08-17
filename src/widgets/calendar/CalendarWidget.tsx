'use client';

import {DatePicker} from '@mui/x-date-pickers';
import {observer} from 'mobx-react-lite';
import {useShiftsStore} from '@/features/shifts';
import {formatDate} from '@/shared/lib/dateUtils';
import {FiCalendar} from 'react-icons/fi';
import styles from './CalendarWidget.module.scss';


export const CalendarWidget = observer(() => {
    const shiftsStore = useShiftsStore();

    if (!shiftsStore.selectedDate) {
        return (
            <div className={styles.loadingContainer}>
                <h3 className={styles.title}>
                    <FiCalendar className="icon-spacer-md" /> Календарь
                </h3>
                <div className={styles.loadingPlaceholder}></div>
                <p className={styles.loadingText}>Загрузка...</p>
            </div>
        );
    }

    return (
        <div>
            <h3 className={styles.title}>
                <FiCalendar className="icon-spacer-md" /> Календарь
            </h3>

            <div className={styles.pickerContainer}>
                <DatePicker
                    label="Выберите дату"
                    value={shiftsStore.selectedDate}
                    onChange={(newValue) => {
                        if (newValue) shiftsStore.setDate(newValue);
                    }}
                    slotProps={{
                        textField: {
                            fullWidth: true,
                            size: 'small' as const,
                            variant: 'outlined' as const
                        }
                    }}
                />
            </div>

            <div className={styles.selectedDate}>
                <span className={styles.label}>Выбрано:</span>
                <span className={styles.value}>
                    {formatDate(shiftsStore.selectedDate)}
                </span>
            </div>
        </div>
    );
});
