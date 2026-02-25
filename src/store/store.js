import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import snippetsReducer from './slices/snippetSlice';
import { saveSnippetsToStorage } from './slices/snippetSlice';

// Middleware to persist snippets to localStorage
const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  
  // Only persist when snippets are updated
  if (action.type.startsWith('snippets/')) {
    const snippets = store.getState().snippets.list;
    saveSnippetsToStorage(snippets);
  }
  
  return result;
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    snippets: snippetsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(localStorageMiddleware),
});

export default store;