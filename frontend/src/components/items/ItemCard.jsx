import React from 'react';
import Badge from '../ui/Badge';

const ItemCard = ({ item, onView }) => {


    return (
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            {/* Status Badge absolute top right or keep inline? Inline seems cleaner with image. 
               Let's keep existing layout but add image above title. 
            */}

            <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-900 line-clamp-1">{item.title}</h3>
                <Badge status={item.status === 'resolved' ? 'resolved' : item.type} />
            </div>



            {/* Image display */}
            {item.image && (
                <div className="mb-4 h-48 w-full rounded-lg overflow-hidden border border-gray-100">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            <p className="text-sm text-gray-500 mb-4 line-clamp-2 h-10">
                {item.description}
            </p>

            <div className="flex items-center gap-3 text-[10px] text-gray-500 mb-4 font-medium uppercase tracking-wide">
                <span className="bg-gray-50 px-2 py-1 rounded">📍 {item.location || 'Non spécifié'}</span>
                <span className="bg-gray-50 px-2 py-1 rounded">📅 {item.date}</span>
            </div>

            <div className="text-right">
                <button
                    onClick={() => onView(item)}
                    className="text-xs font-bold text-gray-900 underline decoration-1 underline-offset-2 hover:text-gray-600 bg-transparent border-none cursor-pointer"
                >
                    Voir détail
                </button>
            </div>
        </div>
    );
};

export default ItemCard;
