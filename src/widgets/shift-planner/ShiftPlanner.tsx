'use client';

import {observer} from 'mobx-react-lite';
import {useEmployeesStore} from '@/features/employees';
import {useShiftsStore} from '@/features/shifts';
import {formatDateLong} from '@/shared/lib/dateUtils';
import {useState, ChangeEvent} from 'react';
import {Button} from '@/shared/ui/Button';
import {Select} from '@/shared/ui/Select';
import {FiSun, FiMoon} from 'react-icons/fi';
import {BsPersonFill, BsPersonCheckFill} from 'react-icons/bs';
import styles from './ShiftPlanner.module.scss';

export const ShiftPlanner = observer(() => {
    const employeesStore = useEmployeesStore();
    const shiftsStore = useShiftsStore();

    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');

    const formattedDate = shiftsStore.selectedDate
        ? formatDateLong(shiftsStore.selectedDate)
        : 'Выберите дату в календаре';

    const dayShiftEmployees = shiftsStore.selectedDate
        ? shiftsStore.getDayShiftEmployees(shiftsStore.selectedDate)
        : [];

    const nightShiftEmployees = shiftsStore.selectedDate
        ? shiftsStore.getNightShiftEmployees(shiftsStore.selectedDate)
        : [];

    const handleAddToShift = (shiftType: 'day' | 'night') => {
        if (selectedEmployeeId) {
            shiftsStore.addToShift(selectedEmployeeId, shiftType);
            setSelectedEmployeeId('');
        }
    };

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedEmployeeId(e.target.value);
    };

    const removeFromShift = (assignmentId: string) => {
        shiftsStore.assignments = shiftsStore.assignments.filter(
            a => a.id !== assignmentId
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.contentCard}>
                <h2 className={styles.title}>
                    Состав смены на <span className={styles.highlight}>{formattedDate}</span>
                </h2>

                <div className={styles.selectRow}>
                    <div className={styles.selectContainer}>
                        <label className={styles.label}>Выберите сотрудника:</label>
                        <Select
                            value={selectedEmployeeId}
                            onChange={handleSelectChange}
                            options={[
                                {value: '', label: '-- Выберите сотрудника --'},
                                ...employeesStore.presentEmployees.map((employee) => ({
                                    value: employee.id,
                                    label: employee.fullName
                                }))
                            ]}
                        />
                    </div>

                    <div className={styles.buttonsContainer}>
                        <Button
                            onClick={() => handleAddToShift('day')}
                            variant="secondary"
                            disabled={!selectedEmployeeId}
                        >
                            <FiSun className="icon-spacer" /> День
                        </Button>
                        <Button
                            onClick={() => handleAddToShift('night')}
                            variant="secondary"
                            disabled={!selectedEmployeeId}
                        >
                            <FiMoon className="icon-spacer" /> Ночь
                        </Button>
                    </div>
                </div>

                <div className={styles.shiftGrid}>
                    <div className={`${styles.shiftSection} ${styles.shiftSectionDay}`}>
                        <h3 className={`${styles.shiftHeader} ${styles.shiftHeaderDay}`}>
                            <FiSun /> Дневная смена
                        </h3>

                        {dayShiftEmployees.length > 0 ? (
                            <ul className={styles.employeeList}>
                                {dayShiftEmployees.map((assignment) => {
                                    const employee = employeesStore.employees.find(
                                        e => e.id === assignment.employeeId
                                    );
                                    return employee ? (
                                        <li
                                            key={assignment.id}
                                            className={styles.employeeItem}
                                        >
                                            <div className={styles.employeeInfo}>
                                                <BsPersonFill />
                                                <span>{employee.fullName}</span>
                                            </div>
                                            <button
                                                onClick={() => removeFromShift(assignment.id)}
                                                className={styles.removeButton}
                                            >
                                                Удалить
                                            </button>
                                        </li>
                                    ) : null;
                                })}
                            </ul>
                        ) : (
                            <div className={styles.emptyState}>
                                Нет сотрудников
                            </div>
                        )}
                    </div>

                    <div className={`${styles.shiftSection} ${styles.shiftSectionNight}`}>
                        <h3 className={`${styles.shiftHeader} ${styles.shiftHeaderNight}`}>
                            <FiMoon /> Ночная смена
                        </h3>

                        {nightShiftEmployees.length > 0 ? (
                            <ul className={styles.employeeList}>
                                {nightShiftEmployees.map((assignment) => {
                                    const employee = employeesStore.employees.find(
                                        e => e.id === assignment.employeeId
                                    );
                                    return employee ? (
                                        <li
                                            key={assignment.id}
                                            className={styles.employeeItem}
                                        >
                                            <div className={styles.employeeInfo}>
                                                <BsPersonFill />
                                                <span>{employee.fullName}</span>
                                            </div>
                                            <button
                                                onClick={() => removeFromShift(assignment.id)}
                                                className={styles.removeButton}
                                            >
                                                Удалить
                                            </button>
                                        </li>
                                    ) : null;
                                })}
                            </ul>
                        ) : (
                            <div className={styles.emptyState}>
                                Нет сотрудников
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.contentCard}>
                <h3 className={styles.statsHeader}>
                    <BsPersonCheckFill /> Сотрудники в отрыве
                </h3>

                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead className={styles.tableHeader}>
                            <tr>
                                <th className={styles.tableHeaderCell}>ФИО</th>
                                <th className={styles.tableHeaderCell}>Причина</th>
                                <th className={styles.tableHeaderCell}>Дата с</th>
                                <th className={styles.tableHeaderCell}>Дата по</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeesStore.absentEmployees.length > 0 ? (
                                employeesStore.absentEmployees.map((employee) => (
                                    <tr key={employee.id} className={styles.tableRow}>
                                        <td className={styles.tableCell}>{employee.fullName}</td>
                                        <td className={styles.tableCell}>{employee.status}</td>
                                        <td className={styles.tableCell}>{employee.absenceStart}</td>
                                        <td className={styles.tableCell}>{employee.absenceEnd}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className={styles.emptyTable}>
                                        Нет сотрудников в отрыве
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
});
