import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import { Code2, Plus, LogOut } from 'lucide-react';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  const goToDashboard = () => {
    if (window.location.pathname !== '/dashboard') {
      navigate('/dashboard');
    }
  };

  return (
    <nav className="bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={goToDashboard}>
            <div className="bg-purple-400 bg-opacity-20 p-2 rounded-lg">
              <Code2 className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold hidden sm:inline">DevSnippets</span>
          </div>

          {/* Center - User greeting */}
          <div className="hidden md:block text-sm text-indigo-100">
            Welcome, <span className="font-semibold">{user?.name || "Developer"}</span>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/create')}
              className="flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition duration-200"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">New Snippet</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;