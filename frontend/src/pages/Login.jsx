import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../store/authSlice';
import AuthLayout from '../components/auth/AuthLayout';
import AuthCard from '../components/auth/AuthCard';
import AuthHeader from '../components/auth/AuthHeader';
import AuthFooterLink from '../components/auth/AuthFooterLink';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, token } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    // If we have a token and user, redirect
    useEffect(() => {
        if (token) {
            // Ideally wait for user to be loaded or just redirect to items
            navigate(user?.role === 'admin' ? '/admin/items' : '/items');
        }
    }, [token, user, navigate]);

    return (
        <AuthLayout>
            <AuthCard>
                <AuthHeader
                    title="Connexion"
                    subtitle="Entre tes identifiants pour accéder à l'application."
                />

                <LoginForm />

                <AuthFooterLink
                    text="Pas encore de compte ?"
                    linkText="S'inscrire"
                    to="/register"
                />

                <div className="mt-8 text-center">
                    <p className="text-[10px] text-gray-300">Conseil: garde toujours <strong>Accept: application/json</strong> côté API.</p>
                </div>
            </AuthCard>
        </AuthLayout>
    );
};

export default Login;
