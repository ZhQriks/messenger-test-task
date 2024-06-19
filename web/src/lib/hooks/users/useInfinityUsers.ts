import { authorizedBackendApiInstance } from '@/services/axios';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';

export const fetchUsers = async ({
  pageParam = 0,
}: {
  pageParam?: number;
}) => {
  try {
    const res = await authorizedBackendApiInstance.get('/users/', {
      params: {
        cursor: pageParam,
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

const useInfinityUsers = () => {
  return useInfiniteQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      console.log("+lastPage?.nextCursor", lastPage?.nextCursor, +lastPage?.nextCursor);
      return lastPage?.nextCursor ? +lastPage?.nextCursor : null
    },
  });
};

export default useInfinityUsers;
