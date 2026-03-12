import type { FC } from 'react';
import { Text, View } from 'react-native';
import { useGetUsersQuery } from '@ocome/shared/redux-store/apis/apiUsers';
import { useColors } from '../hooks/useTheme';

const Users: FC = () => {
  const colors = useColors();
  const { isFetching, isError, data } = useGetUsersQuery();

  if (isFetching) {
    return <Text style={{ color: colors.textSecondary }}>Loading...</Text>;
  }

  if (isError) {
    return <Text style={{ color: colors.error }}>Error fetching users</Text>;
  }

  return (
    <View>
      {data?.map((user: any) => (
        <Text key={user.id} style={{ color: colors.text }}>
          {user.name}
        </Text>
      ))}
    </View>
  );
};

export default Users;
