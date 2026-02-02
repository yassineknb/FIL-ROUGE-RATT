import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ItemsList from '../pages/ItemsList';

import DeclareItem from '../pages/DeclareItem';
import AdminDashboard from '../pages/AdminDashboard';

// Internal components for route protection
const ProtectedRoute = () => {
    const { token } = useSelector((state) => state.auth);
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

const AdminRoute = () => {
    const { token, user } = useSelector((state) => state.auth);
    if (!token) return <Navigate to="/login" replace />;

    // If user data isn't loaded yet but token exists, you might show loading or allow default behavior
    // For strict admin check:
    if (user && user.role !== 'admin') {
        return <Navigate to="/items" replace />;
    }
    return <Outlet />;
};

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Items List (Public acccess allowed? The brief implied redirect if not authenticated, 
         but technically the dashboard might be public. Let's stick to the brief: 
         "Redirect after login... role=user -> /items". 
         "If not authenticated -> redirect to /login" for protected placeholders.
         Let's assume Items list is protected based on "Connecte-toi pour déclarer et retrouver".
         However, typical "Lost & Found" might simplify public view. 
         Wait, user request said "after a user authentifie he coud see the itemslist page".
         So let's make /items protected for now to be safe, or just the actions. 
         Actually, let's keep it accessible but redirect to login if they try to do something?
         The brief said "If not authenticated -> redirect to /login". 
         Let's make /items protected as per typical interpretation of "Connecte-toi..."
         Actually, let's make it protected as requested in the simplification step.
      */}
            <Route element={<ProtectedRoute />}>
                <Route path="/items" element={<ItemsList />} />
                <Route path="/declare" element={<DeclareItem />} />
                <Route path="/edit/:id" element={<DeclareItem />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<AdminRoute />}>
                <Route path="/admin/items" element={<AdminDashboard />} />
            </Route>

            {/* Default Redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};

export default AppRoutes;
