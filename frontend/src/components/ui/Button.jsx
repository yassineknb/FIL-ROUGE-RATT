import React from 'react';

const Button = ({ children, className = "", isLoading, ...props }) => {
    return (
        <button
            disabled={isLoading}
            className={`w-full py-3 px-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
            {...props}
        >
            {isLoading ? 'Chargement...' : children}
        </button>
    );
};

export default Button;
