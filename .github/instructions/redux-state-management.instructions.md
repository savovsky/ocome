# Redux State Management Instructions

## Overview

Redux store is configured in `shared/src/redux-store/` and shared across both web and mobile apps.

**Stack:** Redux Toolkit + Redux Persist + React Redux hooks

---

## Directory Structure

```text
shared/src/redux-store/
├── index.ts               # Store export & setup
├── slices/                # Redux slices (reducers + actions)
│   └── sliceModals.ts     # Example: modals state
├── hooks/                 # Custom React Redux hooks
│   ├── useStoreDispatch.ts
│   └── useStoreSelector.ts
└── apis/                  # RTK Query API configurations
    ├── baseApi.ts         # Base API instance
    ├── apiUsers.ts        # User API endpoints
    └── invalidationTags.ts # Cache invalidation tags
```

---

## Setting Up Redux Store

### Store Configuration (`index.ts`)

The store is configured with:
- Redux Toolkit reducers (slices)
- Redux Persist middleware (saves state to storage)
- Development tools (Redux DevTools)

```typescript
// Export store instance
export { store } from './store'

// Export RootState & AppDispatch types
export type { RootState, AppDispatch } from './store'

// Export slices & hooks
export * from './slices'
export * from './hooks'
export * from './apis'
```

### Provider Setup (App Level)

```typescript
import { Provider } from 'react-redux'
import { store } from '@ocome/shared/redux-store'

export function App() {
  return (
    <Provider store={store}>
      {/* Your app */}
    </Provider>
  )
}
```

---

## Using Redux Hooks

### Accessing State

```typescript
import { useStoreSelector } from '@ocome/shared/redux-store/hooks'
import type { RootState } from '@ocome/shared/redux-store'

function MyComponent() {
  // Selector function
  const count = useStoreSelector((state: RootState) => state.counter.value)
  
  // Or entire slice
  const modals = useStoreSelector((state: RootState) => state.modals)
  
  return <div>{count}</div>
}
```

### Dispatching Actions

```typescript
import { useStoreDispatch } from '@ocome/shared/redux-store/hooks'
import { increment } from '@ocome/shared/redux-store/slices'

function MyComponent() {
  const dispatch = useStoreDispatch()
  
  return (
    <button onClick={() => dispatch(increment())}>
      Increment
    </button>
  )
}
```

---

## Creating Redux Slices

### Slice Pattern

Slices combine reducer, actions, and state definition:

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer
```

### Example: Modals Slice

See `shared/src/redux-store/slices/sliceModals.ts` for modal state management pattern.

---

## RTK Query API Integration

### Base API Setup (`apis/baseApi.ts`)

```typescript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  }),
  endpoints: (builder) => ({
    // Endpoints defined here or in separate files
  }),
})
```

### API Slice Example (`apis/apiUsers.ts`)

```typescript
import { api } from './baseApi'

interface User {
  id: string
  name: string
  email: string
}

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => '/users',
      providesTags: ['Users'],
    }),
    
    createUser: builder.mutation<User, Omit<User, 'id'>>({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['Users'],
    }),
    
    updateUser: builder.mutation<User, User>({
      query: ({ id, ...data }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Users'],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} = usersApi
```

### Using API Hooks in Components

```typescript
import { useGetUsersQuery, useCreateUserMutation } from '@ocome/shared/redux-store/apis'

function UsersList() {
  // Query hook
  const { data: users, isLoading, error } = useGetUsersQuery()
  
  // Mutation hook
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation()
  
  const handleAddUser = async () => {
    try {
      await createUser({ name: 'John', email: 'john@example.com' })
    } catch (err) {
      console.error('Failed to create user', err)
    }
  }
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  
  return (
    <>
      <button onClick={handleAddUser} disabled={isCreating}>
        Add User
      </button>
      <ul>
        {users?.map(user => <li key={user.id}>{user.name}</li>)}
      </ul>
    </>
  )
}
```

---

## Cache Invalidation Tags

### Define Tags (`apis/invalidationTags.ts`)

```typescript
export const CACHE_TAGS = {
  USERS: 'Users',
  USER_DETAIL: 'UserDetail',
  POSTS: 'Posts',
  COMMENTS: 'Comments',
} as const
```

### Use in API Endpoints

```typescript
export const api = createApi({
  // ...
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      providesTags: [CACHE_TAGS.USERS],
    }),
    
    createUser: builder.mutation({
      query: (user) => ({ url: '/users', method: 'POST', body: user }),
      invalidatesTags: [CACHE_TAGS.USERS], // Refetch users list after create
    }),
  }),
})
```

---

## Redux Persist Integration

### Configuration (in store setup)

Redux state is automatically persisted to device/browser storage:

```typescript
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // or AsyncStorage for mobile

const persistConfig = {
  key: 'ocome-root',
  storage,
  whitelist: ['auth', 'user'], // Only persist these reducers
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store)
```

### Using Persisted Store in Apps

```typescript
// Web (React)
import { PersistGate } from 'redux-persist/lib/integration/react'
import { persistor, store } from '@ocome/shared/redux-store'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        {/* App content */}
      </PersistGate>
    </Provider>
  )
}
```

---

## State Shape Reference

View current state shape in Redux DevTools (browser extension):

```typescript
// Example state structure
{
  modals: {
    openModals: {
      userFormModal: true,
      settingsModal: false,
    }
  },
  api: {
    // RTK Query manages this
    queries: { ... },
    mutations: { ... },
  },
  // Other slices...
}
```

---

## Common Patterns

### Conditional Rendering Based on State

```typescript
import { useStoreSelector } from '@ocome/shared/redux-store/hooks'

function MyComponent() {
  const isModalOpen = useStoreSelector(
    (state) => state.modals.openModals.userFormModal
  )
  
  return isModalOpen ? <Modal /> : null
}
```

### Optimistic Updates

```typescript
const [updateUser] = useUpdateUserMutation()

// With optimistic cache update
const result = await updateUser(userData).unwrap()
  .catch((error) => {
    console.error('Update failed, cache reverted:', error)
  })
```

### Combining Selectors (Reselect Pattern)

```typescript
import { createSelector } from '@reduxjs/toolkit'

const selectUsers = (state: RootState) => state.api.users
const selectFilter = (state: RootState) => state.filter

// Memoized selector - only recalculates when inputs change
const selectFilteredUsers = createSelector(
  [selectUsers, selectFilter],
  (users, filter) => users.filter(u => u.name.includes(filter))
)

function Component() {
  const filtered = useStoreSelector(selectFilteredUsers)
  // ...
}
```

---

## Testing Redux

### Test a Slice

```typescript
import { configureStore } from '@reduxjs/toolkit'
import counterReducer, { increment } from '../sliceCounter'

describe('counterSlice', () => {
  it('should increment', () => {
    const store = configureStore({ reducer: { counter: counterReducer } })
    store.dispatch(increment())
    expect(store.getState().counter.value).toBe(1)
  })
})
```

### Test RTK Query

```typescript
import { setupServer } from 'msw/node'
import { rest } from 'msw'

const server = setupServer(
  rest.get('/api/users', (req, res, ctx) => {
    return res(ctx.json([{ id: '1', name: 'John' }]))
  })
)

// Use server in tests to mock API responses
```

---

## Performance Tips

1. **Selector Specificity** - Select only needed parts of state
2. **Memoization** - Use `createSelector` for complex selectors
3. **Cache Invalidation** - Use tags to manage cache efficiently
4. **Normalize State** - Keep state flat for easier updates
5. **RTK Query First** - Use for API data, Redux Toolkit for UI state
