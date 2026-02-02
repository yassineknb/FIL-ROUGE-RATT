import React from 'react';
import { Link } from 'react-router-dom';

const AuthFooterLink = ({ text, linkText, to }) => {
    return (
        <div className="mt-6 text-center text-xs text-gray-500">
            {text} <Link to={to} className="font-bold text-gray-900 hover:text-gray-700 underline decoration-1 underline-offset-2">{linkText}</Link>
        </div>
    );
};

export default AuthFooterLink;
