import React, { useState, useEffect } from 'react';

const AdminFilter = ({ onFilter, className = "" }) => {
    const [filters, setFilters] = useState({
        status: '',
        type: '',
        search: ''
    });

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };


    useEffect(() => {
        const timer = setTimeout(() => {
            onFilter(filters);
        }, 500);

        return () => clearTimeout(timer);
    }, [filters]);

    const handleReset = () => {
        setFilters({ status: '', type: '', search: '' });
    };

    return (
        <div className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-end ${className}`}>


            <div className="w-full md:flex-1">
                <label htmlFor="type" className="block text-xs font-medium text-gray-500 mb-1">Type</label>
                <select
                    id="type"
                    name="type"
                    value={filters.type}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 appearance-none"
                >
                    <option value="">Tous</option>
                    <option value="lost">Perdu</option>
                    <option value="found">Trouvé</option>
                </select>
            </div>


            <div className="w-full md:flex-1">
                <label htmlFor="status" className="block text-xs font-medium text-gray-500 mb-1">Statut</label>
                <select
                    id="status"
                    name="status"
                    value={filters.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 appearance-none"
                >
                    <option value="">Tous</option>
                    <option value="pending">En attente (Pending)</option>
                    <option value="resolved">Résolu</option>
                </select>
            </div>


            <div className="w-full md:flex-[2]">
                <label htmlFor="search" className="block text-xs font-medium text-gray-500 mb-1">Recherche (lieu / titre)</label>
                <input
                    id="search"
                    name="search"
                    type="text"
                    placeholder="Ex: Gare, Station, iPhone..."
                    value={filters.search}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
            </div>


            <div className="flex gap-2 w-full md:w-auto mt-2 md:mt-0">
                <button
                    onClick={handleReset}
                    className="flex-1 md:flex-none px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default AdminFilter;
