import type { FC } from 'react';

import { useGetUsersQuery } from '@ocome/shared/redux-store/apis/apiUsers';

const Users: FC = () => {
  const { isFetching, isError, data } = useGetUsersQuery();

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching users</div>;
  }

  return <div>{data?.map((user: any) => <div key={user.id}>{user.name}</div>)}</div>;
};

export default Users;
