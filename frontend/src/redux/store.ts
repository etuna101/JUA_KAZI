import { configureStore } from '@reduxjs/toolkit';

// Initial root reducer (we can add more slices later)
const rootReducer = {
  // Add reducers here
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 