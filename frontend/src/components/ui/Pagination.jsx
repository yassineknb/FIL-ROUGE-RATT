import React from 'react';

const Pagination = ({ currentPage, lastPage, onPageChange }) => {
    return (
        <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
            <button
                disabled={currentPage <= 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="px-3 py-1.5 md:px-4 md:py-2 border rounded-full text-xs md:text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            >
                ← <span className="hidden md:inline">Précédent</span><span className="md:hidden">Préc.</span>
            </button>

            <span className="px-3 py-2 text-sm font-bold text-gray-800 bg-white border rounded-lg">
                {currentPage}
            </span>

            {/* Placeholder for ellipsis or multiple pages if needed */}

            <button
                disabled={currentPage >= lastPage}
                onClick={() => onPageChange(currentPage + 1)}
                className="px-3 py-1.5 md:px-4 md:py-2 border rounded-full text-xs md:text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            >
                <span className="hidden md:inline">Suivant</span><span className="md:hidden">Suiv.</span> →
            </button>
        </div>
    );
};

export default Pagination;
