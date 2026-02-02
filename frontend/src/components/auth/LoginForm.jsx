import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/authSlice';
import AuthForm from './AuthForm';
import AuthField from './AuthField';
import Button from '../ui/Button';
import Alert from '../ui/Alert';

const LoginForm = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [localError, setLocalError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError(null);
        const resultAction = await dispatch(loginUser(formData));

        if (loginUser.fulfilled.match(resultAction)) {
            // Success handled by parent useEffect redirect
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
                />

                <div className="flex items-center justify-between mb-6">
                    <label className="flex items-center text-xs text-gray-500 cursor-pointer">
                        <input type="checkbox" className="mr-2 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400" />
                        Se souvenir de moi
                    </label>
                    <a href="#" className="text-xs text-gray-500 underline hover:text-gray-800">Mot de passe oublié ?</a>
                </div>

                <Button type="submit" isLoading={loading}>
                    Se connecter
                </Button>
            </AuthForm>
        </>
    );
};

export default LoginForm;
