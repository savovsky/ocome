import { baseApi } from './baseApi';
import invalidationTags from './invalidationTags';

export const endPointPath = 'users';
const { TAG_USERS } = invalidationTags;

export const apiUsers = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<any, void>({
      query: () => {
        return {
          method: 'GET',
          url: `${endPointPath}`,
        };
      },
      keepUnusedDataFor: 0,

      transformResponse: (response: any) => {
        return response;
      },

      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      },

      providesTags: [TAG_USERS],
    }),
  }),
});

export const { useGetUsersQuery } = apiUsers;
