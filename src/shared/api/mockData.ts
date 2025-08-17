import {Employee} from '@/entities/employee/types'

export const mockEmployees: Employee[] = [
    {
        id: '1',
        fullName: 'Иванов Иван Иванович',
        status: 'на месте',
        absenceStart: null,
        absenceEnd: null
    },
    {
        id: '2',
        fullName: 'Петров Петр Петрович',
        status: 'на месте',
        absenceStart: null,
        absenceEnd: null
    },
    {
        id: '3',
        fullName: 'Сидоров Сергей Васильевич',
        status: 'больничный',
        absenceStart: '2025-05-01',
        absenceEnd: '2025-05-15'
    },
    {
        id: '4',
        fullName: 'Кузнецов Александр Викторович',
        status: 'отпуск',
        absenceStart: '2025-06-10',
        absenceEnd: '2025-06-24'
    },
    {
        id: '5',
        fullName: 'Николаев Николай Николаевич',
        status: 'кмд',
        absenceStart: '2025-05-05',
        absenceEnd: '2025-05-12'
    },
    {
        id: '6',
        fullName: 'Васильев Василий Васильевич',
        status: 'на месте',
        absenceStart: null,
        absenceEnd: null
    },
    {
        id: '7',
        fullName: 'Алексеев Алексей Алексеевич',
        status: 'больничный',
        absenceStart: '2025-05-20',
        absenceEnd: '2025-06-05'
    },
];