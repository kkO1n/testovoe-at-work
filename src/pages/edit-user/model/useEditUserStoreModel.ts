import { useMemo } from 'react';
import { useUsersStore } from '../../../store/useUsersStore';
import type { UserApi } from '../../../types/user';
import { mergeEditable } from '../../../utils/user-mappers';
import type { EditUserFormData } from './editUserForm';
import { normalizePhone } from './editUserForm';

export const useEditUserStoreModel = (user: UserApi | undefined) => {
  const editsById = useUsersStore((state) => state.editsById);
  const saveUserEdits = useUsersStore((state) => state.saveUserEdits);

  const mergedEditable = useMemo(() => {
    if (!user) {
      return undefined;
    }

    const merged = mergeEditable(user, editsById[user.id]);
    return {
      ...merged,
      phone: normalizePhone(merged.phone),
    };
  }, [editsById, user]);

  const save = (values: EditUserFormData) => {
    if (!user) {
      return;
    }

    saveUserEdits(user.id, {
      ...values,
      phone: normalizePhone(values.phone),
    });
  };

  return {
    mergedEditable,
    avatarUrl: mergedEditable?.avatarUrl,
    save,
  };
};
