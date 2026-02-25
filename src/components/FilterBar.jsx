import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterLanguage, setShowFavorites } from '../store/slices/snippetSlice';
import { Filter, Star, ChevronDown } from 'lucide-react';

const FilterBar = () => {
  const dispatch = useDispatch();
  const filterLanguage = useSelector(state => state.snippets.filterLanguage);
  const showFavorites = useSelector(state => state.snippets.showFavorites);

  const languages = [
    'All',
    'JavaScript',
    'React',
    'CSS',
    'HTML',
    'Python',
    'Java',
    'C++',
    'Ruby',
    'Go',
    'Rust',
    'TypeScript',
    'SQL',
    'Bash',
    'Dockerfile'
  ];

  const handleLanguageChange = (e) => {
    dispatch(setFilterLanguage(e.target.value));
  };

  const handleToggleFavorites = () => {
    dispatch(setShowFavorites(!showFavorites));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Language Filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <select
            value={filterLanguage}
            onChange={handleLanguageChange}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        {/* Favorites Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleFavorites}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
              showFavorites 
                ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' 
                : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
            }`}
          >
            <Star className={`h-5 w-5 ${showFavorites ? 'fill-current' : ''}`} />
            <span>{showFavorites ? 'Show All' : 'Favorites Only'}</span>
          </button>
        </div>

        {/* Mobile View Indicator */}
        <div className="sm:hidden text-xs text-gray-500 ml-auto">
          <span className="inline-flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            {showFavorites ? 'Favorites' : 'All'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;