import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/authSlice';

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    };

    return (
        <nav className="bg-white border-b border-gray-100 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-[#0F172A] font-bold text-xs">
                    LF
                </div>
                <div className="leading-tight">
                    <h1 className="font-bold text-gray-900 text-sm">Lost & Found</h1>
                    <p className="text-[9px] text-gray-400 uppercase tracking-widest">Declare. Find. Recover.</p>
                </div>
            </Link>

            {/* Center Navigation */}
            <div className="hidden md:flex items-center space-x-8">
                <Link to="/items" className="text-sm font-bold text-white bg-[#0F172A] px-4 py-2 rounded-full">Objets</Link>
                <Link to="/declare" className="text-sm font-medium text-gray-600 hover:text-gray-900">Déclarer</Link>
                {user && user.role === 'admin' && (
                    <Link to="/admin/items" className="text-sm font-bold text-gray-900 border-b-2 border-yellow-400">Dashboard</Link>
                )}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                {user ? (
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600 hidden sm:block">Bonjour, {user.name}</span>
                        <button
                            onClick={handleLogout}
                            className="text-sm font-medium text-red-600 hover:text-red-700"
                        >
                            Déconnexion
                        </button>
                    </div>
                ) : (
                    <>
                        <Link to="/login" className="text-sm font-bold text-gray-700 hover:text-gray-900">Connexion</Link>
                        <Link to="/register" className="px-5 py-2 bg-[#0F172A] text-white text-sm font-bold rounded-full hover:bg-slate-800 transition-colors">
                            Inscription
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
