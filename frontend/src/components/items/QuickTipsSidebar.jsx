import React from 'react';
import { Link } from 'react-router-dom';

const QuickTipsSidebar = () => {
    return (
        <div className="w-full lg:w-80 shrink-0">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
                <h3 className="font-bold text-gray-900 mb-4">Conseils rapides</h3>

                <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-xs text-gray-600 leading-relaxed">
                        <span className="text-green-500 font-bold text-sm">✓</span>
                        <span>Ajoute une description précise (couleur, marque, état).</span>
                    </li>
                    <li className="flex items-start gap-3 text-xs text-gray-600 leading-relaxed">
                        <span className="text-green-500 font-bold text-sm">✓</span>
                        <span>Indique un lieu clair (ex: "Gare - Guichet").</span>
                    </li>
                    <li className="flex items-start gap-3 text-xs text-gray-600 leading-relaxed">
                        <span className="text-green-500 font-bold text-sm">✓</span>
                        <span>Choisis le bon type : <strong>Perdu</strong> ou <strong>Trouvé</strong>.</span>
                    </li>
                    <li className="flex items-start gap-3 text-xs text-gray-600 leading-relaxed">
                        <span className="text-green-500 font-bold text-sm">✓</span>
                        <span>La date doit être valide (champ obligatoire).</span>
                    </li>
                </ul>

                <div className="mt-8 bg-gray-50 rounded-lg p-4 text-[10px] text-gray-500">
                    <p className="font-bold text-gray-700 mb-1">Rappel</p>
                    Après soumission, un message de succès/erreur s'affiche selon la validation.
                </div>

                <div className="mt-4">
                    <Link to="/items" className="block w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-lg transition-colors text-center">
                        Voir la liste
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default QuickTipsSidebar;
