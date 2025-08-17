'use client'

import {useState} from 'react';
import * as XLSX from 'xlsx';
import {Employee} from '@/entities/employee/types';
import styles from './ExcelUploader.module.scss';
import {validateEmployeeData} from '@/shared/lib/excelValidator';

type ExcelRow = Record<string, unknown>;

const normalizeKeys = (obj: ExcelRow): ExcelRow => {
    const normalizedObj: ExcelRow = {};

    Object.keys(obj).forEach(key => {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const normalizedKey = key.trim();
            normalizedObj[normalizedKey] = obj[key];
        }
    });

    return normalizedObj;
};

export const ExcelUploader = ({onUploadAction}: {
    onUploadAction: (data: Employee[]) => void
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsLoading(true);
        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                if (!event.target || !event.target.result) {
                    throw new Error('Ошибка чтения файла: результат пуст');
                }

                const data = new Uint8Array(event.target.result as ArrayBuffer);
                const workbook = XLSX.read(data, {type: 'array'});
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData: ExcelRow[] = XLSX.utils.sheet_to_json(worksheet);
                const normalizedData = jsonData.map(normalizeKeys);
                const validatedData = validateEmployeeData(normalizedData);

                onUploadAction(validatedData);
            } catch (error) {
                console.error('Error parsing Excel file:', error);
                alert(`Ошибка при обработке файла: ${(error as Error).message}`);
            } finally {
                setIsLoading(false);
            }
        };

        reader.onerror = () => {
            console.error('File read error');
            setIsLoading(false);
            alert('Ошибка чтения файла');
        };

        reader.readAsArrayBuffer(file);
    };

    return (
        <div className={styles.container}>
            <label className={styles.label}>
                Загрузить данные сотрудников:
            </label>
            <div className={styles.inputContainer}>
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload}
                    disabled={isLoading}
                    className={styles.input}
                />
                {isLoading && (
                    <div className={styles.spinnerContainer}>
                        <div className={styles.spinner}></div>
                    </div>
                )}
            </div>
        </div>
    );
};
