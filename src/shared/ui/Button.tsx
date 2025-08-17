'use client';

import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}) => {
    return (
        <button
            className={`
        ${styles.button} 
        ${styles[`button-${variant}`]} 
        ${styles[`button-${size}`]} 
        ${className}
      `}
            {...props}
        >
            {children}
        </button>
    )
}
