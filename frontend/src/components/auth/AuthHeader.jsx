import React from 'react';

const AuthHeader = ({ title, subtitle }) => {
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
    );
};

export default AuthHeader;
