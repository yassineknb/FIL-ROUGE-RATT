import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminFilter from './AdminFilter';
import AdminItemsTable from './AdminItemsTable';
import Pagination from '../ui/Pagination';
import itemsApi from '../../services/itemsApi';

const AdminBoard = () => {
    const [items, setItems] = useState([]);
    const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async (page = 1, currentFilters = {}) => {
        setLoading(true);
        try {
            const params = { page, ...currentFilters };
            const response = await itemsApi.getAllAdmin(params);

            if (response.data.success) {
                setItems(response.data.data.data);
                setPagination({
                    current_page: response.data.data.current_page,
                    last_page: response.data.data.last_page
                });
            }
        } catch (error) {
            console.error("Failed to fetch admin items", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilter = (newFilters) => {
        setFilters(newFilters);
        fetchItems(1, newFilters);
    };

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            await itemsApi.updateStatus(id, newStatus);
            setItems(items.map(item => item.id === id ? { ...item, status: newStatus } : item));
        } catch (error) {
            console.error("Update failed", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet objet ?")) return;

        try {
            await itemsApi.deleteAdmin(id);
            setItems(items.filter(item => item.id !== id));
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    const handlePageChange = (page) => {
        fetchItems(page, filters);
    };

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Interface Admin</h2>
                <Link to="/items" className="bg-[#0F172A] hover:bg-slate-800 text-white font-bold py-2 px-6 rounded-lg transition-colors text-sm flex items-center gap-2 w-full md:w-auto justify-center">
                    <span>←</span> Retour liste publique
                </Link>
            </div>

            <AdminFilter onFilter={handleFilter} className="mb-10" />

            <AdminItemsTable
                items={items}
                onUpdateStatus={handleUpdateStatus}
                onDelete={handleDelete}
            />

            <div className="mt-6 flex justify-center md:justify-end items-center text-xs text-gray-400">
                <Pagination
                    currentPage={pagination.current_page}
                    lastPage={pagination.last_page}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default AdminBoard;
