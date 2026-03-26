import { z } from 'zod';

const phonePattern = /^\d+(?:-\d+)*$/;

export const editUserSchema = z.object({
  name: z.string().trim().min(2, 'Имя должно быть не короче 2 символов').max(64, 'Максимум 64 символа'),
  username: z
    .string()
    .trim()
    .min(2, 'Никнейм должен быть не короче 2 символов')
    .max(64, 'Максимум 64 символа'),
  email: z.string().trim().pipe(z.email('Введите корректную почту')),
  city: z.string().trim().min(2, 'Город должен быть не короче 2 символов').max(64, 'Максимум 64 символа'),
  phone: z
    .string()
    .trim()
    .min(1, 'Телефон обязателен')
    .refine((value) => phonePattern.test(value), 'Телефон может содержать только цифры и дефис'),
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

export const normalizePhone = (value: string): string => {
  const withoutExtension = value.replace(/\s*(?:x|ext\.?|доб\.?)\s*\d+\s*$/i, '');
  return withoutExtension
    .replace(/[^\d-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};
