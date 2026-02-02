import React from 'react';
import Badge from '../ui/Badge';
import { Link } from 'react-router-dom';

const MyItemCard = ({ item, onEdit, onDelete }) => {
    return (
        <div className="bg-gray-50 rounded-lg border border-gray-100 p-4 mb-3">
            <div className="flex justify-between items-start mb-1">
                <h4 className="font-bold text-sm text-gray-900 line-clamp-1">{item.title}</h4>
                <Badge status={item.status} />
            </div>
            <div className="flex gap-3 mb-3">
                {item.image && (
                    <div className="h-12 w-12 shrink-0 rounded overflow-hidden border border-gray-200">
                        <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                    </div>
                )}
                <div>
                    <div className="text-[10px] text-gray-400 mb-1">
                        {item.location} • {item.date}
                    </div>
                </div>
            </div>

            <div className="flex gap-2">
                <Link
                    to={`/edit/${item.id}`}
                    className="flex-1 py-1.5 bg-[#0F172A] text-white text-xs font-bold rounded hover:bg-slate-800 transition-colors text-center"
                >
                    Modifier
                </Link>
                <button
                    onClick={() => onDelete(item.id)}
                    className="flex-1 py-1.5 bg-white border border-red-100 text-red-600 text-xs font-bold rounded hover:bg-red-50 transition-colors"
                >
                    Supprimer
                </button>
            </div>
        </div>
    );
};

export default MyItemCard;
