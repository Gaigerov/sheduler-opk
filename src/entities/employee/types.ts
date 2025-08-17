export type EmployeeStatus = 'на месте' | 'больничный' | 'кмд' | 'отпуск'

export interface Employee {
    id: string;
    fullName: string;
    status: string;
    absenceStart?: string | null;
    absenceEnd?: string | null;
}
