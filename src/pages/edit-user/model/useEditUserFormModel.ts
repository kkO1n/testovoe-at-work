import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { EditableUser } from '../../../types/user';
import { editUserSchema, emptyEditUserForm, type EditUserFormData } from './editUserForm';

export const useEditUserFormModel = (mergedEditable: EditableUser | undefined) => {
  const form = useForm<EditUserFormData>({
    resolver: zodResolver(editUserSchema),
    defaultValues: emptyEditUserForm,
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (!mergedEditable) {
      return;
    }

    form.reset(mergedEditable);
  }, [form, mergedEditable]);

  return form;
};
