import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../store/authSlice';
import AuthLayout from '../components/auth/AuthLayout';
import AuthCard from '../components/auth/AuthCard';
import AuthHeader from '../components/auth/AuthHeader';
import AuthFooterLink from '../components/auth/AuthFooterLink';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    useEffect(() => {
        if (token) {
            navigate('/items');
        }
    }, [token, navigate]);

    return (
        <AuthLayout>
            <AuthCard>
                <AuthHeader
                    title="Inscription"
                    subtitle="Crée ton compte. Le rôle user est attribué automatiquement."
                />

                <RegisterForm />

                <AuthFooterLink
                    text="Déjà un compte ?"
                    linkText="Se connecter"
                    to="/login"
                />


            </AuthCard>
        </AuthLayout>
    );
};

export default Register;
