import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Plus, Code2, Star, Layers } from 'lucide-react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import SnippetCard from '../components/SnippetCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const { list, searchTerm, filterLanguage, showFavorites } = useSelector(
    state => state.snippets
  );

  // Derived filtered list
  const filteredSnippets = useMemo(() => {
    return list
      .filter(snippet => {
        const term = searchTerm.toLowerCase();
        const matchesSearch =
          snippet.title.toLowerCase().includes(term) ||
          snippet.language.toLowerCase().includes(term) ||
          snippet.tags.some(tag => tag.toLowerCase().includes(term)) ||
          (snippet.description && snippet.description.toLowerCase().includes(term));

        const matchesLanguage =
          filterLanguage === 'All' || snippet.language === filterLanguage;

        const matchesFavorites = !showFavorites || snippet.isFavorite;

        return matchesSearch && matchesLanguage && matchesFavorites;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [list, searchTerm, filterLanguage, showFavorites]);

  // Stats
  const totalSnippets = list.length;
  const totalFavorites = list.filter(s => s.isFavorite).length;
  const totalLanguages = [...new Set(list.map(s => s.language))].length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Stats Banner */}
      <div className="bg-linear-to-r from-indigo-600 to-purple-600 text-gray py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Your Code Vault</h2>
          <div className="grid grid-cols-3 gap-4 max-w-lg">
            {/* Total Snippets */}
            <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center">
              <div className="flex justify-center mb-1">
                <Code2 className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold">{totalSnippets}</div>
              <div className="text-xs text-gray-700">Snippets</div>
            </div>

            {/* Favorites */}
            <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center">
              <div className="flex justify-center mb-1">
                <Star className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold">{totalFavorites}</div>
              <div className="text-xs text-gray-700">Favorites</div>
            </div>

            {/* Languages */}
            <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center">
              <div className="flex justify-center mb-1">
                <Layers className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold">{totalLanguages}</div>
              <div className="text-xs text-gray-700">Languages</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-4">
          <SearchBar />
        </div>

        {/* Filter Bar */}
        <FilterBar />

        {/* Results Count */}
        {(searchTerm || filterLanguage !== 'All' || showFavorites) && (
          <p className="text-sm text-gray-500 mb-4">
            Showing <span className="font-semibold text-indigo-600">{filteredSnippets.length}</span> of {totalSnippets} snippets
          </p>
        )}

        {/* Snippet Grid */}
        {filteredSnippets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSnippets.map(snippet => (
              <SnippetCard key={snippet.id} snippet={snippet} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="bg-indigo-50 p-6 rounded-full mb-6">
              <Code2 className="h-12 w-12 text-indigo-400" />
            </div>
            {list.length === 0 ? (
              <>
                <h3 className="text-xl font-bold text-gray-700 mb-2">No snippets yet</h3>
                <p className="text-gray-500 mb-6 max-w-sm">
                  Start building your personal code vault. Save your first snippet now!
                </p>
                <button
                  onClick={() => navigate('/create')}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                >
                  <Plus className="h-5 w-5" />
                  Create Your First Snippet
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold text-gray-700 mb-2">No results found</h3>
                <p className="text-gray-500 max-w-sm">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;