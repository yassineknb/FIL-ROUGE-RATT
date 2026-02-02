import React from 'react';
import MyItemCard from './MyItemCard';


const UserSidebar = ({
    user,
    userItems,
    onEditItem,
    onDeleteItem
}) => {
    if (!user) return null;

    return (
        <div className="w-full lg:w-80 shrink-0 hidden lg:block">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-900">Mes déclarations</h3>
                    <div className="flex flex-col items-end">
                        <span className="text-xs font-bold text-gray-900">{user.name}</span>
                    </div>
                </div>

                <div className="space-y-3">
                    {userItems.length > 0 ? (
                        userItems.slice(0, 5).map(item => (
                            <MyItemCard
                                key={item.id}
                                item={item}
                                onEdit={onEditItem}
                                onDelete={onDeleteItem}
                            />
                        ))
                    ) : (
                        <p className="text-xs text-gray-400 italic">Aucune déclaration récente.</p>
                    )}
                </div>


            </div>
        </div>
    );
};

export default UserSidebar;
