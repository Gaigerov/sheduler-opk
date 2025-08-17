'use client'

import {createContext, ReactNode, useContext, useState} from 'react'
import {ShiftsStore} from './store'

const ShiftsContext = createContext<ShiftsStore | null>(null)

export const ShiftsProvider = ({children}: {children: ReactNode}) => {
    const [store] = useState(() => new ShiftsStore())

    return (
        <ShiftsContext.Provider value={store}>
            {children}
        </ShiftsContext.Provider>
    )
}

export const useShiftsStore = () => {
    const store = useContext(ShiftsContext)
    if (!store) throw new Error('ShiftsStore not initialized')
    return store
}
