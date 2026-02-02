import React from 'react';

const AuthCard = ({ children }) => {
    return (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
            {children}
        </div>
    );
};

export default AuthCard;
