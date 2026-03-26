import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { fetchUserById } from '../../../api/users';
import type { UserApi } from '../../../types/user';

export const useEditUserQuery = (userId: number) => {
  const queryClient = useQueryClient();
  const isValidId = Number.isInteger(userId) && userId > 0;

  const usersFromList = queryClient.getQueryData<UserApi[]>(['users']);

  const cachedUser = useMemo(
    () => usersFromList?.find((item) => item.id === userId),
    [userId, usersFromList],
  );

  const { data: userFromApi, isPending, isError, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUserById(userId),
    enabled: isValidId,
  });

  const user = cachedUser ?? userFromApi;

  return {
    isValidId,
    user,
    isPending,
    isError,
    error,
  };
};
