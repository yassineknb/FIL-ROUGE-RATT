import React from 'react';
import Badge from '../ui/Badge';

const ItemDetailsModal = ({ item, onClose }) => {
    if (!item) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-fade-in" onClick={e => e.stopPropagation()}>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Image Section */}
                {item.image && (
                    <div className="w-full h-64 md:h-80 bg-gray-100">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Content Section */}
                <div className="p-6 md:p-8">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <Badge status={item.type} />
                                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{item.date}</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">{item.title}</h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 bg-gray-50 p-3 rounded-lg inline-block">
                        <span>📍</span>
                        <span className="font-medium">{item.location}</span>
                    </div>

                    <div className="prose prose-sm text-gray-600 mb-8">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">Description</h3>
                        <p className="whitespace-pre-line">{item.description || "Aucune description fournie."}</p>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-gray-100">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg transition-colors"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetailsModal;
