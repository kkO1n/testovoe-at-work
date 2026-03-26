import { z } from 'zod';

export const editUserSchema = z.object({
  name: z.string().trim().min(2, 'Имя должно быть не короче 2 символов').max(64, 'Максимум 64 символа'),
  username: z
    .string()
    .trim()
    .min(2, 'Никнейм должен быть не короче 2 символов')
    .max(64, 'Максимум 64 символа'),
  email: z.string().trim().email('Введите корректную почту'),
  city: z.string().trim().min(2, 'Город должен быть не короче 2 символов').max(64, 'Максимум 64 символа'),
  phone: z
    .string()
    .trim()
    .min(1, 'Телефон обязателен')
    .refine((value) => /\d/.test(value), 'Телефон должен содержать цифры'),
  companyName: z
    .string()
    .trim()
    .min(2, 'Название компании должно быть не короче 2 символов')
    .max(64, 'Максимум 64 символа'),
  avatarUrl: z.string().trim().url('Введите корректный URL аватара'),
});

export type EditUserFormData = z.infer<typeof editUserSchema>;

export const emptyEditUserForm: EditUserFormData = {
  name: '',
  username: '',
  email: '',
  city: '',
  phone: '',
  companyName: '',
  avatarUrl: '',
};

export const normalizePhone = (value: string): string => value.replace(/\D/g, '');
