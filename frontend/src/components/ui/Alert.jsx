import React from 'react';

const Alert = ({ message, type = "error" }) => {
    if (!message) return null;

    const styles = {
        error: "bg-red-50 text-red-700 border border-red-200",
        success: "bg-green-50 text-green-700 border border-green-200"
    };

    return (
        <div className={`p-4 rounded-md mb-4 text-sm ${styles[type] || styles.error}`}>
            {message}
        </div>
    );
};

export default Alert;
