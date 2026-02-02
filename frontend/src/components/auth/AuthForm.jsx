import React from 'react';

const AuthForm = ({ children, onSubmit, className = "" }) => {
    return (
        <form onSubmit={onSubmit} className={className}>
            {children}
        </form>
    );
};

export default AuthForm;
