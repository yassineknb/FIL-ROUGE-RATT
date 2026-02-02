import React, { useState } from 'react';
import Badge from '../ui/Badge';

const AdminItemsTable = ({ items, onUpdateStatus, onDelete }) => {
    // Local state to manage status changes before saving
    // Format: { itemId: 'newStatus' }
    const [pendingChanges, setPendingChanges] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);

    const handleStatusChange = (id, newStatus) => {
        setPendingChanges({ ...pendingChanges, [id]: newStatus });
    };

    const handleSave = (id) => {
        const newStatus = pendingChanges[id];
        if (newStatus) {
            onUpdateStatus(id, newStatus);
            // Clear pending change after save (optimistic or wait for parent refresh)
            const newChanges = { ...pendingChanges };
            delete newChanges[id];
            setPendingChanges(newChanges);
        }
    };

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-gray-900">Tous les objets</h3>
                </div>

            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50/50 text-gray-900 font-bold uppercase text-[10px] tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Image</th>
                            <th className="px-6 py-4">Titre</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Lieu</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Statut</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {items.map((item) => {
                            const currentStatus = pendingChanges[item.id] || item.status;
                            const hasChanged = pendingChanges[item.id] && pendingChanges[item.id] !== item.status;

                            return (
                                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">

                                    <td className="px-6 py-4">
                                        {item.image ? (
                                            <div
                                                className="h-10 w-10 rounded overflow-hidden border border-gray-200 cursor-pointer hover:opacity-80 transition-opacity"
                                                onClick={() => setSelectedImage(item.image)}
                                            >
                                                <img src={item.image} alt="" className="h-full w-full object-cover" />
                                            </div>
                                        ) : (
                                            <div className="h-10 w-10 rounded bg-gray-50 flex items-center justify-center text-gray-300 text-xs text-center border border-gray-100">
                                                No img
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-900 line-clamp-1">{item.title}</div>

                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${item.type === 'lost' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                                            {item.type === 'lost' ? 'Perdu' : 'Trouvé'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-xs">{item.location}</td>
                                    <td className="px-6 py-4 text-xs">{item.date}</td>
                                    <td className="px-6 py-4">
                                        {/* Status Dropdown */}
                                        <select
                                            value={currentStatus}
                                            onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                            className={`
                                                px-2 py-1 rounded text-[10px] font-bold border-none focus:ring-0 cursor-pointer
                                                ${currentStatus === 'pending' ? 'bg-yellow-50 text-yellow-700' : ''}
                                                ${currentStatus === 'resolved' ? 'bg-green-50 text-green-700' : ''}
                                                ${currentStatus === 'archived' ? 'bg-gray-100 text-gray-500' : ''}
                                            `}
                                        >
                                            <option value="pending">pending</option>
                                            <option value="resolved">resolved</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            {hasChanged && (
                                                <button
                                                    onClick={() => handleSave(item.id)}
                                                    className="bg-[#0F172A] text-white text-[10px] font-bold px-3 py-1.5 rounded hover:bg-slate-800 transition-colors"
                                                >
                                                    Sauvegarder
                                                </button>
                                            )}
                                            <button
                                                onClick={() => onDelete(item.id)}
                                                className="bg-red-50 text-red-600 text-[10px] font-bold px-3 py-1.5 rounded hover:bg-red-100 transition-colors"
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {items.length === 0 && (
                    <div className="p-8 text-center text-gray-400 text-sm">
                        Aucun objet trouvé.
                    </div>
                )}
            </div>
            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-4xl max-h-[90vh] rounded-lg overflow-hidden shadow-2xl">
                        <img
                            src={selectedImage}
                            alt="Full preview"
                            className="max-w-full max-h-[90vh] object-contain"
                        />
                        <button
                            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-md transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminItemsTable;
