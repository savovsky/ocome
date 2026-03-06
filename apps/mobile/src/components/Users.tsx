import type { FC } from 'react';
import { Text, View } from 'react-native';

import { useGetUsersQuery } from '@ocome/shared/redux-store/apis/apiUsers';

const Users: FC = () => {
  const { isFetching, isError, data } = useGetUsersQuery();

  if (isFetching) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error fetching users</Text>;
  }

  return <View>{data?.map((user: any) => <Text key={user.id}>{user.name}</Text>)}</View>;
};

export default Users;
