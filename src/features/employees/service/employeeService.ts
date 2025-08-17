import {Employee} from '@/entities/employee/types';
import {parseExcelFile} from '@/shared/lib/excelParser';

const EXCEL_PATH = process.cwd() + '/data/employees.xlsx';

export const loadEmployeesFromExcel = (): Employee[] => {
    return parseExcelFile<Employee>(EXCEL_PATH);
};
