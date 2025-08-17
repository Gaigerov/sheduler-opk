import {format} from 'date-fns'
import {ru} from 'date-fns/locale'

export const formatDate = (date: Date, pattern = 'dd.MM.yyyy'): string => {
    return format(date, pattern, {locale: ru})
}

export const formatDateLong = (date: Date): string => {
    return format(date, 'd MMMM yyyy г.', {locale: ru})
}
