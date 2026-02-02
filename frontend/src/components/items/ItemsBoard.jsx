import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import itemsApi from '../../services/itemsApi';
import ItemsFilter from './ItemsFilter';
import ItemsGrid from './ItemsGrid';
import UserSidebar from './UserSidebar';
import ItemDetailsModal from './ItemDetailsModal';

const ItemsBoard = () => {
    const { user } = useSelector((state) => state.auth);
    const [items, setItems] = useState([]);
    const [userItems, setUserItems] = useState([]);
    const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({});
    const [selectedItem, setSelectedItem] = useState(null);

    // Ref to track the latest request to avoid race conditions
    const lastRequestRef = useRef(0);

    // Fetch All Items
    const fetchItems = async (page = 1, currentFilters = {}) => {
        const requestId = ++lastRequestRef.current;
        setLoading(true);
        try {
            const params = { page, ...currentFilters };
            const response = await itemsApi.getAll(params);

            // Only update state if this is still the latest request
            if (requestId === lastRequestRef.current) {
                if (response.data.success) {
                    setItems(response.data.data.data);
                    setPagination({
                        current_page: response.data.data.current_page,
                        last_page: response.data.data.last_page
                    });
                }
                setLoading(false);
            }
        } catch (error) {
            if (requestId === lastRequestRef.current) {
                console.error("Failed to fetch items", error);
                setLoading(false);
            }
        }
    };

    // Fetch User Items (Sidebar)
    const fetchUserItems = async () => {
        if (!user) return;
        try {
            const response = await itemsApi.getMyItems();
            if (response.data.success) {
                setUserItems(response.data.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch my items", error);
        }
    };

    useEffect(() => {
        fetchItems();
        if (user) {
            fetchUserItems();
        }
    }, [user]);

    const handleViewItem = (item) => {
        setSelectedItem(item);
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
    };

    const handleFilter = (newFilters) => {
        setFilters(newFilters);
        fetchItems(1, newFilters);
    };

    const handlePageChange = (page) => {
        fetchItems(page, filters);
    };

    const handleEditItem = async (item) => {
        // Toggle status logic
        const newStatus = item.status === 'resolved' ? 'pending' : 'resolved';
        if (!window.confirm(`Voulez-vous marquer cet objet comme ${newStatus === 'resolved' ? 'résolu' : 'en attente'} ?`)) return;

        try {
            const response = await itemsApi.update(item.id, { status: newStatus });
            if (response.data.success) {
                // Update local state
                setUserItems(prev => prev.map(i => i.id === item.id ? { ...i, status: newStatus } : i));
                // Also update main list if present there
                setItems(prev => prev.map(i => i.id === item.id ? { ...i, status: newStatus } : i));
            }
        } catch (error) {
            console.error("Failed to update item status", error);
        }
    };

    const handleDeleteItem = async (id) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer votre déclaration ?")) return;
        try {
            await itemsApi.delete(id);
            setUserItems(prev => prev.filter(i => i.id !== id));
            setItems(prev => prev.filter(i => i.id !== id));
        } catch (error) {
            console.error("Failed to delete item", error);
        }
    };

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h2 className="text-2xl font-bold text-gray-900">Liste des objets perdus & trouvés</h2>
                <Link to="/declare">
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-6 rounded-lg transition-colors text-sm">
                        + Déclarer un objet
                    </button>
                </Link>
            </div>

            <ItemsFilter onFilter={handleFilter} className="mb-10" />

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <ItemsGrid
                    items={items}
                    loading={loading}
                    pagination={pagination}
                    onPageChange={handlePageChange}
                    onViewItem={handleViewItem}
                />

                <UserSidebar
                    user={user}
                    userItems={userItems}
                    onEditItem={handleEditItem}
                    onDeleteItem={handleDeleteItem}
                />
            </div>
            {selectedItem && (
                <ItemDetailsModal
                    item={selectedItem}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};

export default ItemsBoard;
