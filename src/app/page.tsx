'use client' // Добавляем директиву для использования клиентских хуков

import { Header } from '@/widgets/header/Header';
import { CalendarWidget } from '@/widgets/calendar/CalendarWidget';
import { ShiftPlanner } from '@/widgets/shift-planner/ShiftPlanner';
import { Suspense, useState } from 'react';
import Loading from '@/app/loading';
import { FiClipboard } from 'react-icons/fi';
import styles from './page.module.scss';
import { ExcelUploader } from '@/widgets/excelUploader/ExcelUploader';
import { useEmployeesStore } from '@/features/employees';
import { Employee } from '@/entities/employee/types';

export default function HomePage() {
    const employeesStore = useEmployeesStore();
    const [uploadKey, setUploadKey] = useState(0);
    
    const handleUploadAction = (data: Employee[]) => {
        employeesStore.loadEmployees(data);
        setUploadKey(prev => prev + 1);
    };

    return (
        <div className={styles.pageContainer}>
            <Header />

            <div className={styles.mainContainer}>
                <main className={styles.main}>
                    <Suspense fallback={<Loading />}>
                        <ShiftPlanner />
                    </Suspense>
                    
                    <div className={styles.uploadContainer}>
                        <ExcelUploader 
                            key={uploadKey} 
                            onUploadAction={handleUploadAction} 
                        />
                    </div>
                </main>

                <aside className={styles.aside}>
                    <div className={styles.stickyContainer}>
                        <CalendarWidget />

                        <div className={styles.statsCard}>
                            <h3 className={styles.statsTitle}>
                                <FiClipboard /> План судозахода
                            </h3>
                            <div className={styles.noticeCard}>
                                <p className={styles.noticeText}>
                                    План судозахода на текущие сутки будет отображен здесь после утверждения.
                                </p>
                            </div>
                        </div>

                        <div className={styles.statsCard}>
                            <h3 className={styles.statsTitle}>Статистика</h3>
                            <div>
                                <div className={styles.statsItem}>
                                    <span className={styles.statsLabel}>Сотрудников всего:</span>
                                    <span className={styles.statsValue}>
                                        {employeesStore.employees.length}
                                    </span>
                                </div>
                                <div className={styles.statsItem}>
                                    <span className={styles.statsLabel}>На смене сегодня:</span>
                                    <span className={styles.statsValue}>
                                        {employeesStore.presentEmployees.length}
                                    </span>
                                </div>
                                <div className={styles.statsItem}>
                                    <span className={styles.statsLabel}>В отрыве:</span>
                                    <span className={styles.statsValue}>
                                        {employeesStore.absentEmployees.length}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
