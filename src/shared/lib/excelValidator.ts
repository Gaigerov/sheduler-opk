import {Employee} from '@/entities/employee/types';
import {z} from 'zod';

const EmployeeSchema = z.object({
    id: z.union([
        z.string().min(1, "ID обязателен"),
        z.number().transform(String)
    ]),
    fullName: z.string().min(2, "ФИО должно содержать минимум 2 символа"),
    status: z.string().min(1, "Статус обязателен"),
    absenceStart: z.union([
        z.string().nullable(),
        z.date().transform(d => d.toISOString().split('T')[0]),
        z.null()
    ]).optional(),
    absenceEnd: z.union([
        z.string().nullable(),
        z.date().transform(d => d.toISOString().split('T')[0]),
        z.null()
    ]).optional()
});

export const validateEmployeeData = (data: unknown): Employee[] => {
    if (!Array.isArray(data)) {
        throw new Error('Данные должны быть массивом');
    }

    try {
        const result = z.array(EmployeeSchema).parse(data);

        return result.map(item => ({
            id: item.id,
            fullName: item.fullName,
            status: item.status,
            absenceStart: item.absenceStart || null,
            absenceEnd: item.absenceEnd || null
        }));
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errors = error.issues.map(issue => {
                let rowInfo = "Неизвестная строка";
                let fieldInfo = "неизвестное поле";

                if (issue.path.length > 0) {
                    const rowIndex = issue.path[0];
                    if (typeof rowIndex === 'number') {
                        rowInfo = `Строка ${rowIndex + 1}`;
                    }

                    if (issue.path.length > 1) {
                        const field = issue.path[1];
                        if (typeof field === 'string') {
                            fieldInfo = field;
                        }
                    }
                }

                return `${rowInfo}, поле ${fieldInfo}: ${issue.message}`;
            }).join('\n');

            throw new Error(`Неверный формат данных в Excel файле:\n${errors}`);
        }
        throw new Error('Неизвестная ошибка при валидации данных');
    }
};
