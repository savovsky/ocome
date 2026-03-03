import type { FC } from 'react';

import { apiUsers } from '@ocome/shared/redux-store';

const { useGET_usersQuery } = apiUsers;

const Users: FC = () => {
  const { isFetching, isError, data } = useGET_usersQuery();

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching users</div>;
  }

  return <div>{data?.map((user: any) => <div key={user.id}>{user.name}</div>)}</div>;
};

export default Users;
