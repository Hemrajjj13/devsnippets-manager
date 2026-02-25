import { createSlice } from '@reduxjs/toolkit';
import { saveSnippets, loadSnippets } from '../../utils/persistance';


const initialState = {
  list: [],
  searchTerm: '',
  filterLanguage: 'All',
  showFavorites: false,
};

const snippetsSlice = createSlice({
  name: 'snippets',
  initialState,
  reducers: {
    addSnippet: (state, action) => {
      state.list.push(action.payload);
    },
    updateSnippet: (state, action) => {
      const index = state.list.findIndex(snippet => snippet.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteSnippet: (state, action) => {
      state.list = state.list.filter(snippet => snippet.id !== action.payload);
    },
    toggleFavorite: (state, action) => {
      const index = state.list.findIndex(snippet => snippet.id === action.payload);
      if (index !== -1) {
        state.list[index].isFavorite = !state.list[index].isFavorite;
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilterLanguage: (state, action) => {
      state.filterLanguage = action.payload;
    },
    setShowFavorites: (state, action) => {
      state.showFavorites = action.payload;
    },
    setSnippets: (state, action) => {
      state.list = Array.isArray(action.payload) ? action.payload : [];
    },
  },
});

// Add this after your slice definition
export const loadSnippetsFromStorage = () => (dispatch) => {
  const savedSnippets = loadSnippets() || [];
  dispatch(setSnippets(savedSnippets));
};


export const saveSnippetsToStorage = (snippets) => {
  saveSnippets(snippets);
};

export const {
  addSnippet,
  updateSnippet,
  deleteSnippet,
  toggleFavorite,
  setSearchTerm,
  setFilterLanguage,
  setShowFavorites,
  setSnippets,
} = snippetsSlice.actions;

export default snippetsSlice.reducer;