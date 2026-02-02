import React from 'react';
import ItemCard from './ItemCard';
import Pagination from '../ui/Pagination';

const ItemsGrid = ({
    items,
    loading,
    pagination,
    onPageChange,
    onViewItem
}) => {
    return (
        <div className="flex-1 w-full">
            <h3 className="text-center md:text-left text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Objets récents</h3>

            {loading && items.length === 0 ? (
                <div className="text-center py-10 text-gray-500">Chargement...</div>
            ) : (
                <div className={`min-h-[200px] ${loading ? 'opacity-50 pointer-events-none' : ''} transition-opacity duration-200`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {items.length > 0 ? (
                            items.map(item => (
                                <ItemCard
                                    key={item.id}
                                    item={item}
                                    onView={onViewItem}
                                />
                            ))
                        ) : (
                            <div className="col-span-2 text-center py-10 text-gray-400">Aucun objet trouvé.</div>
                        )}
                    </div>
                </div>
            )}

            {!loading && items.length > 0 && (
                <div className="mt-8">
                    <Pagination
                        currentPage={pagination.current_page}
                        lastPage={pagination.last_page}
                        onPageChange={onPageChange}
                    />
                </div>
            )}
        </div>
    );
};

export default ItemsGrid;
