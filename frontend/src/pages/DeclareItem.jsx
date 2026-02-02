import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import DeclareForm from '../components/items/DeclareForm';
import QuickTipsSidebar from '../components/items/QuickTipsSidebar';
import { Link } from 'react-router-dom';

const DeclareItem = () => {
    return (
        <MainLayout>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Déclarer un objet</h2>
                    <p className="text-sm text-gray-600">
                        Remplis le formulaire pour informer les autres utilisateurs. Les champs obligatoires sont marqués (*).
                    </p>
                </div>

                <Link to="/items" className="bg-[#0F172A] hover:bg-slate-800 text-white font-bold py-2 px-6 rounded-lg transition-colors text-sm flex items-center gap-2">
                    <span>←</span> Retour à la liste
                </Link>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Left: Form */}
                <div className="flex-1 w-full">
                    <DeclareForm />
                </div>

                {/* Right: Quick Tips */}
                <QuickTipsSidebar />
            </div>
        </MainLayout>
    );
};

export default DeclareItem;
