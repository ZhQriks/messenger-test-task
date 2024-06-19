import { authorizedBackendApiInstance } from '@/services/axios';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';

export const fetchUsers = async ({
  pageParam = 0,
  email = '',
}: {
  pageParam?: number;
  email?: string; 
}) => {
  try {
    const res = await authorizedBackendApiInstance.get('/users/', {
      params: {
        cursor: pageParam,
        email,
      },
    });
    if (!res.data) {
      throw new Error('Error while fetching');
    }
    const users = res.data;
    const nextCursor = res.data.nextCursor;
    return { users, nextCursor };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `An error occurred while fetching, ${error.message}`
      );
    }
  }
};

const useInfinityUsers = (email = '') => {
  return useInfiniteQuery({
    queryKey: ['users', email],
    queryFn: ({ pageParam = 0 }) => fetchUsers({ pageParam, email }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage?.nextCursor ? +lastPage?.nextCursor : null
    },
  });
};

export default useInfinityUsers;
