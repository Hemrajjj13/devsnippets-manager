import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toggleFavorite, deleteSnippet } from '../store/slices/snippetSlice';
import { Star, Edit, Trash2, Copy, ArrowLeft, Tag, Code2, Clock, Bookmark } from 'lucide-react';
import { getLanguageColor } from '../utils/languageColors';
import Navbar from '../components/Navbar';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';

const SnippetDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // Get snippet from store
  const snippets = useSelector(state => state.snippets.list);
  const snippet = snippets.find(s => s.id === id);

  // Copy to clipboard hook
  const [copied, copyToClipboard] = useCopyToClipboard();

  if (!snippet) {
  return (
    <div className="p-6 text-center text-gray-500">
      Loading snippet...
    </div>
  );
}




  if (!snippet) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <p className="text-gray-600 mb-4">Snippet not found</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleCopy = () => {
    copyToClipboard(snippet.code);
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(snippet.id));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this snippet?')) {
      dispatch(deleteSnippet(snippet.id));
      navigate('/dashboard');
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${snippet.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Page Header */}
      <div className="bg-linear-to-r from-indigo-600 to-purple-600 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Back to Dashboard</span>
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{snippet.title}</h1>
              <div className="flex items-center gap-4 mt-2 text-indigo-100">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${getLanguageColor(snippet.language)}`}>
                  {snippet.language}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs">
                    Created {new Date(snippet.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleFavorite}
                className={`p-2 rounded-full transition-colors ${
                  snippet.isFavorite
                    ? 'text-yellow-500 bg-yellow-100'
                    : 'text-gray-300 hover:text-yellow-500 hover:bg-yellow-100'
                }`}
                title="Toggle favorite"
              >
                <Star className={`h-5 w-5 ${snippet.isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Code Display */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          {/* Header */}
          <div className="bg-slate-800 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-slate-400 text-sm font-mono">
                {snippet.language.toLowerCase()}.snippet
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className={`p-2 rounded transition-colors ${
                  copied
                    ? 'text-green-400 bg-green-900'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
                title={copied ? 'Copied!' : 'Copy code'}
              >
                <Copy className="h-5 w-5" />
              </button>
              <button
                onClick={handleEdit}
                className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-700 rounded transition-colors"
                title="Edit snippet"
              >
                <Edit className="h-5 w-5" />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded transition-colors"
                title="Delete snippet"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Code */}
          <div className="p-6 bg-slate-900">
            <pre className="text-sm text-slate-100 font-mono overflow-x-auto whitespace-pre-wrap wrap-break-words">
              <code>{snippet.code}</code>
            </pre>
          </div>
        </div>

        {/* Description */}
        {snippet.description && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{snippet.description}</p>
          </div>
        )}

        {/* Tags */}
        {snippet.tags.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {snippet.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              <Edit className="h-5 w-5" />
              Edit Snippet
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              <Trash2 className="h-5 w-5" />
              Delete Snippet
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnippetDetail;