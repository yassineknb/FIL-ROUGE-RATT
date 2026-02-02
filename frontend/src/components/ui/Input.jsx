import React from 'react';

const Input = ({ label, id, type = "text", error, helperText, ...props }) => {
    return (
        <div className="mb-4">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors
            ${error ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white placeholder-gray-400'}
        `}
                {...props}
            />
            {helperText && !error && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
};

export default Input;
