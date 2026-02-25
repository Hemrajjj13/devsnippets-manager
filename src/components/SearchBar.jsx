import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../store/slices/snippetSlice';
import { Search, X } from 'lucide-react';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(state => state.snippets.searchTerm);

  const handleClear = () => {
    dispatch(setSearchTerm(''));
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search snippets by title, tags, or language..."
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
      />
      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;