import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateSnippet, deleteSnippet } from "../store/slices/snippetSlice";
import { Plus, X, Tag, FileCode, BookOpen, Code2 } from "lucide-react";
import { LANGUAGES } from "../utils/languageColors";
import Navbar from "../components/Navbar";

const EditSnippet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // Get snippet from store
  const snippets = useSelector((state) => state.snippets.list);
  const snippet = snippets.find((s) => s.id === id);

  // State for form
  const [title, setTitle] = useState(() => snippet?.title || "");
  const [language, setLanguage] = useState(
    () => snippet?.language || "JavaScript",
  );
  const [code, setCode] = useState(() => snippet?.code || "");
  const [tags, setTags] = useState(() => snippet?.tags?.join(", ") || "");
  const [description, setDescription] = useState(
    () => snippet?.description || "",
  );
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!snippet) {
    return null; // or loader
  }

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!code.trim()) newErrors.code = "Code is required";
    if (!language) newErrors.language = "Language is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    const updatedSnippet = {
      ...snippet,
      title: title.trim(),
      language,
      code: code.trim(),
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
      description: description.trim(),
    };

    dispatch(updateSnippet(updatedSnippet));

    setTimeout(() => {
      dispatch(updateSnippet(updatedSnippet));
      navigate(`/snippet/${id}`);
    }, 500);
  };

  const handleTagsKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  // Clear error on field change
  const clearError = (field) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Page Header */}
      <div className="bg-linear-to-r from-indigo-600 to-purple-600 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white bg-opacity-20 p-2 rounded-lg">
              <Code2 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Edit Snippet</h1>
              <p className="text-indigo-100 text-sm mt-1">
                Update your code snippet
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate(`/snippet/${id}`)}
            className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition"
          >
            <X className="h-5 w-5" />
            <span className="hidden sm:inline">Cancel</span>
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Fields */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Snippet Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    clearError("title");
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-800 ${
                    errors.title
                      ? "border-red-400 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="e.g. React useDebounce Hook"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <X className="h-4 w-4" /> {errors.title}
                  </p>
                )}
              </div>

              {/* Code Editor */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Code <span className="text-red-500">*</span>
                </label>

                {/* Fake Editor Header */}
                <div className="bg-slate-800 rounded-t-lg px-4 py-2 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-2 text-slate-400 text-xs font-mono">
                    {language.toLowerCase()}.snippet
                  </span>
                </div>

                <textarea
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    clearError("code");
                  }}
                  onKeyDown={handleTagsKeyDown}
                  rows={16}
                  spellCheck={false}
                  className={`w-full px-4 py-4 border-x border-b rounded-b-lg font-mono text-sm bg-slate-900 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y ${
                    errors.code ? "border-red-400" : "border-slate-700"
                  }`}
                  placeholder={`// Start typing your ${language} code here...`}
                />
                {errors.code && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <X className="h-4 w-4" /> {errors.code}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-indigo-500" />
                    Description
                    <span className="text-gray-400 font-normal text-xs">
                      (optional)
                    </span>
                  </div>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-800 resize-none"
                  placeholder="What does this snippet do? When should it be used?"
                />
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Language */}
              {/* Language */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <FileCode className="h-4 w-4 text-indigo-500" />
                    Language <span className="text-red-500">*</span>
                  </div>
                </label>
                <select
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value);
                    clearError("language");
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-800 ${
                    errors.language
                      ? "border-red-400 bg-red-50"
                      : "border-gray-300"
                  }`}
                >
                  {LANGUAGES.filter((l) => l !== "All").map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
                {errors.language && (
                  <p className="text-red-500 text-sm mt-2">{errors.language}</p>
                )}
              </div>

              {/* Tags */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-indigo-500" />
                    Tags
                    <span className="text-gray-400 font-normal text-xs">
                      (optional)
                    </span>
                  </div>
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-800"
                  placeholder="react, hook, form"
                />
                <p className="text-xs text-gray-400 mt-2">
                  Separate tags with commas
                </p>

                {/* Tag Preview */}
                {tags && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {tags
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter((tag) => tag.length > 0)
                      .map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full border border-indigo-200"
                        >
                          #{tag}
                        </span>
                      ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5" />
                    Update Snippet
                  </>
                )}
              </button>

              {/* Cancel Button */}
              <button
                type="button"
                onClick={() => navigate(`/snippet/${id}`)}
                className="w-full bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-200 transition"
              >
                Cancel
              </button>

              {/* Delete Button */}
              <button
                type="button"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this snippet?",
                    )
                  ) {
                    dispatch(deleteSnippet(id));
                    navigate("/dashboard");
                  }
                }}
                className="w-full bg-red-50 text-red-600 font-semibold py-3 rounded-xl hover:bg-red-100 transition flex items-center justify-center gap-2"
              >
                <X className="h-5 w-5" />
                Delete Snippet
              </button>

              {/* Tip Box */}
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                <p className="text-xs font-semibold text-indigo-700 mb-1">
                  💡 Pro Tip
                </p>
                <p className="text-xs text-indigo-600">
                  You can always restore deleted snippets from your browser's
                  localStorage.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSnippet;
