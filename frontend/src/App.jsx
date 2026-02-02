import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { useDispatch } from 'react-redux';
import { fetchUser } from './store/authSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Try to restore session on load if token exists
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchUser());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
