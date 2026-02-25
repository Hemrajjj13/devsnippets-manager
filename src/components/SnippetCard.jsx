import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleFavorite, deleteSnippet } from "../store/slices/snippetSlice";
import { Star, Edit, Trash2, Copy, Eye } from "lucide-react";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";
import { getLanguageColor } from "../utils/languageColors";

const SnippetCard = ({ snippet }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [copied, copyToClipboard] = useCopyToClipboard();

  const previewCode = snippet.code.split("\n").slice(0, 3).join("\n");
  const hasMoreLines = snippet.code.split("\n").length > 3;

  return (
    <div className="bg-purple-500 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-100">
      {/* Card Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex justify-between items-start gap-2">
          {/* Title + Badges */}
          <div className="flex-1 min-w-0">
            <h3
              onClick={() => navigate(`/snippet/${snippet.id}`)}
              className="text-lg font-bold text-gray-800 mb-2 cursor-pointer hover:text-indigo-600 transition-colors truncate"
            >
              {snippet.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              {/* Language Badge */}
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getLanguageColor(snippet.language)}`}
              >
                {snippet.language}
              </span>
              {/* Tags */}
              {snippet.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
              {snippet.tags.length > 2 && (
                <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">
                  +{snippet.tags.length - 2} more
                </span>
              )}
            </div>
          </div>

          {/* Favorite Button */}
          <button
            onClick={() => dispatch(toggleFavorite(snippet.id))}
            className={`p-2 rounded-full transition-all shrink-0 ${
              snippet.isFavorite
                ? "text-yellow-500 bg-yellow-50"
                : "text-gray-300 hover:text-yellow-400 hover:bg-yellow-50"
            }`}
            title="Toggle favorite"
          >
            <Star
              className={`h-5 w-5 ${snippet.isFavorite ? "fill-current" : ""}`}
            />
          </button>
        </div>

        {/* Description */}
        {snippet.description && (
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">
            {snippet.description}
          </p>
        )}
      </div>

      {/* Code Preview */}
      <div className="flex-1 bg-gray-900 p-4">
        <pre className="text-sm text-gray-300 font-mono overflow-x-auto whitespace-pre-wrap wrap-break-words">
          <code>
            {previewCode}
            {hasMoreLines && <span className="text-slate-500">{"\n"}...</span>}
          </code>
        </pre>
      </div>

      {/* Card Footer */}
      <div className="p-3 bg-slate-800 flex justify-between items-center">
        {/* Date */}
        <span className="text-xs text-slate-400">
          {new Date(snippet.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          {/* Copy */}
          <button
            onClick={() => copyToClipboard(snippet.code)}
            className={`p-2 rounded transition-colors ${
              copied
                ? "text-green-400 bg-green-900"
                : "text-slate-400 hover:text-white hover:bg-slate-700"
            }`}
            title={copied ? "Copied!" : "Copy code"}
          >
            <Copy className="h-4 w-4" />
          </button>

          {/* View */}
          <button
            onClick={() => navigate(`/snippet/${snippet.id}`)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
            title="View snippet"
          >
            <Eye className="h-4 w-4" />
          </button>

          {/* Edit */}
          <button
            onClick={() => navigate(`/edit/${snippet.id}`)}
            className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-700 rounded transition-colors"
            title="Edit snippet"
          >
            <Edit className="h-4 w-4" />
          </button>

          {/* Delete */}
          <button
            onClick={() => {
              if (window.confirm("Delete this snippet?")) {
                dispatch(deleteSnippet(snippet.id));
              }
            }}
            className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded transition-colors"
            title="Delete snippet"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SnippetCard;
