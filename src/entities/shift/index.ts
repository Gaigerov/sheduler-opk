export interface ShiftAssignment {
    id: string;
    employeeId: string;
    date: string;
    shiftType: 'day' | 'night';
}
