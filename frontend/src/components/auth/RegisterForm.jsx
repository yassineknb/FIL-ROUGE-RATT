import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../store/authSlice';
import AuthForm from './AuthForm';
import AuthField from './AuthField';
import Button from '../ui/Button';
import Alert from '../ui/Alert';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [localError, setLocalError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError(null);

        const resultAction = await dispatch(registerUser(formData));

        if (registerUser.fulfilled.match(resultAction)) {
            // Redirect to login on success
            navigate('/login');
        } else {
            if (resultAction.payload) {
                if (resultAction.payload.errors) {
                    setLocalError(Object.values(resultAction.payload.errors).flat().join(' '));
                } else if (resultAction.payload.message) {
                    setLocalError(resultAction.payload.message);
                } else {
                    setLocalError("Une erreur est survenue.");
                }
            } else {
                setLocalError("Impossible de contacter le serveur.");
            }
        }
    };

    return (
        <>
            {(localError || error?.message) && <Alert message={localError || error?.message} type="error" />}

            <AuthForm onSubmit={handleSubmit}>
                <AuthField
                    label="Nom complet"
                    id="name"
                    placeholder="Yassine"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />

                <AuthField
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="yassine@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />

                <AuthField
                    label="Mot de passe"
                    id="password"
                    type="password"
                    placeholder="........"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    helperText="Min. 8 caractères recommandé."
                />

                <AuthField
                    label="Confirmation"
                    id="password_confirmation"
                    type="password"
                    placeholder="........"
                    value={formData.password_confirmation}
                    onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                    required
                />

                <Button type="submit" isLoading={loading} className="mt-2">
                    Créer mon compte
                </Button>
            </AuthForm>
        </>
    );
};

export default RegisterForm;
