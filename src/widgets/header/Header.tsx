'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {FiUser, FiSettings, FiLogOut} from 'react-icons/fi';
import styles from './Header.module.scss';

export const Header = () => {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>Планировщик ОПК</div>

                <nav className={styles.nav}>
                    <Link
                        href="/"
                        className={`${styles.navLink} ${isActive('/') ? styles.navLinkActive : ''}`}
                    >
                        Главная
                    </Link>
                    <Link
                        href="/employees"
                        className={`${styles.navLink} ${isActive('/employees') ? styles.navLinkActive : ''}`}
                    >
                        Сотрудники
                    </Link>
                    <Link
                        href="/schedule"
                        className={`${styles.navLink} ${isActive('/schedule') ? styles.navLinkActive : ''}`}
                    >
                        График
                    </Link>
                    <Link
                        href="/reports"
                        className={`${styles.navLink} ${isActive('/reports') ? styles.navLinkActive : ''}`}
                    >
                        Отчеты
                    </Link>
                </nav>

                <div className={styles.userSection}>
                    <div className={styles.avatar}>
                        <FiUser />
                    </div>
                    <span className={styles.userName}>А.С. Шадрин</span>
                    <button className={styles.navLink}>
                        <FiSettings />
                    </button>
                    <button className={styles.navLink}>
                        <FiLogOut />
                    </button>
                </div>
            </div>
        </header>
    );
};
