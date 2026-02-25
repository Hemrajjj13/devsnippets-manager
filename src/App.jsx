import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { loadSnippetsFromStorage } from './store/slices/snippetsSlice';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateSnippet from './pages/CreateSnippet';
import EditSnippet from './pages/EditSnippet';
import SnippetDetail from './pages/SnippetDetail';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSnippetsFromStorage());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><CreateSnippet /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><EditSnippet /></ProtectedRoute>} />
        <Route path="/snippet/:id" element={<ProtectedRoute><SnippetDetail /></ProtectedRoute>} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;