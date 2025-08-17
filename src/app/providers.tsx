'use client';

import {EmployeesProvider} from '@/features/employees'
import {ShiftsProvider} from '@/features/shifts'
import {LocalizationProvider} from '@mui/x-date-pickers'
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import {ru} from 'date-fns/locale'
import {useEffect, useState} from 'react'

export const Providers = ({children}: {children: React.ReactNode}) => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    return (
        <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={ru}
        >
            <EmployeesProvider>
                <ShiftsProvider>
                    {children}
                </ShiftsProvider>
            </EmployeesProvider>
        </LocalizationProvider>
    )
}
