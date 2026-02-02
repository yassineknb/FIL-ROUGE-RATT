import React from 'react';

const Badge = ({ status }) => {
    const styles = {
        pending: "bg-yellow-100 text-yellow-800",
        found: "bg-green-100 text-green-800",
        lost: "bg-red-100 text-red-800",
        resolved: "bg-green-100 text-green-800",
        archived: "bg-gray-100 text-gray-800",
    };

    const labels = {
        pending: "En attente",
        found: "Trouvé",
        lost: "Perdu",
        resolved: "Résolu",
        archived: "Archivé",
    };

    const type = status?.toLowerCase() || 'pending';

    return (
        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[type] || styles.pending}`}>
            {labels[type] || status}
        </span>
    );
};

export default Badge;
