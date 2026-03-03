import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import invalidationTags from './invalidationTags';

const timeout = 15000; // milliseconds (15sec)
const baseUrl = 'https://jsonplaceholder.typicode.com';

const baseQuery = fetchBaseQuery({ baseUrl, timeout, prepareHeaders: undefined });

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery,
  endpoints: () => ({}),
  tagTypes: [...Object.values(invalidationTags)],
});
