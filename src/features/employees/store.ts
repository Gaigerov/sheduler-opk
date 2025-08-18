import {makeAutoObservable} from 'mobx'
import {Employee} from '@/entities/employee/types'

export class EmployeesStore {
    employees: Employee[] = []

    constructor() {
        makeAutoObservable(this)
    }

    loadEmployees(data: Employee[]) {
        this.employees = data
    }

    get presentEmployees() {
        return this.employees.filter(e => e.status === 'на месте')
    }

    get absentEmployees() {
        return this.employees.filter(e => e.status !== 'на месте')
    }
}