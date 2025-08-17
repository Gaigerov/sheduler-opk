'use client';

import React from 'react';
import styles from './Select.module.scss';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: {value: string; label: string}[];
    hasError?: boolean;
}

export const Select: React.FC<SelectProps> = ({
    options,
    hasError = false,
    className,
    ...props
}) => {
    return (
        <div className={styles.selectContainer}>
            <select
                className={`
                    ${styles.select} 
                    ${hasError ? styles['select-error'] : ''} 
                    ${className}
                `}
                {...props}
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <div className={styles.arrow}></div>
        </div>
    )
}
