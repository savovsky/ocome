import type { FC } from 'react';
import { Text, View } from 'react-native';

import { apiUsers } from '@ocome/shared/redux-store';

const { useGET_usersQuery } = apiUsers;

const Users: FC = () => {
  const { isFetching, isError, data } = useGET_usersQuery();

  if (isFetching) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error fetching users</Text>;
  }

  return <View>{data?.map((user: any) => <Text key={user.id}>{user.name}</Text>)}</View>;
};

export default Users;
