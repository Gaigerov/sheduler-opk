import * as XLSX from 'xlsx';

export const parseExcelFile = <T>(filePath: string): T[] => {
    try {
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        return XLSX.utils.sheet_to_json(worksheet) as T[];
    } catch (error) {
        console.error('Error parsing Excel file:', error);
        return [];
    }
};
