import type { FC } from 'react';
import Button from '@mui/material/Button';
import { useGetUsersQuery } from '@ocome/shared/redux-store/apis/apiUsers';
import { logComponentNameInDevMode } from '../utils/utilsDebug';

const Users: FC = () => {
  logComponentNameInDevMode(Users.name);

  const { isFetching, isError, data } = useGetUsersQuery();

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching users</div>;
  }

  return (
    <>
      <Button variant='contained'>Hello world</Button>
      <div>{data?.map((user: any) => <div key={user.id}>{user.name}</div>)}</div>
    </>
  );
};

export default Users;
