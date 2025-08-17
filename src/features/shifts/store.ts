import {ShiftAssignment} from '@/entities/shift'
import {makeAutoObservable} from 'mobx'

export class ShiftsStore {
    assignments: ShiftAssignment[] = []
    selectedDate: Date = new Date()

    constructor() {
        makeAutoObservable(this)
    }

    setDate(date: Date) {
        this.selectedDate = date
    }

    addToShift(employeeId: string, shiftType: 'day' | 'night') {
        const dateStr = this.selectedDate.toISOString().split('T')[0]
        this.assignments.push({
            id: `${employeeId}-${dateStr}-${shiftType}`,
            employeeId,
            date: dateStr,
            shiftType
        })
    }

    getDayShiftEmployees(date: Date) {
        const dateStr = date.toISOString().split('T')[0]
        return this.assignments.filter(a => a.date === dateStr && a.shiftType === 'day')
    }

    getNightShiftEmployees(date: Date) {
        const dateStr = date.toISOString().split('T')[0]
        return this.assignments.filter(a => a.date === dateStr && a.shiftType === 'night')
    }
}
