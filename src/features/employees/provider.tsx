'use client'

import {createContext, ReactNode, useContext, useState, useEffect} from 'react'
import {EmployeesStore} from './store'
import {mockEmployees} from '@/shared/api/mockData'

const EmployeesContext = createContext<EmployeesStore | null>(null)

export const EmployeesProvider = ({children}: {children: ReactNode}) => {
    const [store] = useState(() => new EmployeesStore())
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const initializeStore = async () => {
            try {
                store.loadEmployees(mockEmployees)
            } catch (error) {
                console.error('Failed to load employees', error)
            } finally {
                setIsLoading(false)
            }
        }
        
        initializeStore()
    }, [store])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    return (
        <EmployeesContext.Provider value={store}>
            {children}
        </EmployeesContext.Provider>
    )
}

export const useEmployeesStore = () => {
    const store = useContext(EmployeesContext)
    if (!store) throw new Error('EmployeesStore not initialized')
    return store
}
