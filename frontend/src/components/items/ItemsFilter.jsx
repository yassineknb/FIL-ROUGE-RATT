import React, { useState, useEffect } from 'react';

const ItemsFilter = ({ onFilter, className = "" }) => {
    const [filters, setFilters] = useState({
        type: '',
        location: '' // Backend expects 'location'
    });

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    // Debounced Auto-Search
    useEffect(() => {
        const timer = setTimeout(() => {
            onFilter(filters);
        }, 500); // 500ms wait time

        return () => clearTimeout(timer);
    }, [filters]); // Trigger when filters change

    const handleReset = () => {
        setFilters({ type: '', location: '' });
        // onFilter will be triggered by the effect
    };

    return (
        <div className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-end ${className}`}>

            {/* Type Filter */}
            <div className="w-full md:flex-1">
                <label htmlFor="type" className="block text-xs font-medium text-gray-500 mb-1">Type</label>
                <select
                    id="type"
                    name="type"
                    value={filters.type}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 appearance-none"
                >
                    <option value="">Tous les types</option>
                    <option value="lost">Perdu</option>
                    <option value="found">Trouvé</option>
                </select>
            </div>

            {/* Location Filter */}
            <div className="w-full md:flex-1">
                <label htmlFor="location" className="block text-xs font-medium text-gray-500 mb-1">Lieu</label>
                <input
                    id="location"
                    name="location" // Changed from 'place' to 'location'
                    type="text"
                    placeholder="Ex: Gare, Station, Université..."
                    value={filters.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
            </div>

            {/* Actions */}
            <div className="flex gap-2 w-full md:w-auto mt-2 md:mt-0">
                <button
                    onClick={handleReset}
                    className="flex-1 md:flex-none px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors"
                >
                    Réinitialiser
                </button>
            </div>
        </div>
    );
};

export default ItemsFilter;
