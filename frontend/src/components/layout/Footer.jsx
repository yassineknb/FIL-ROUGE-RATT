import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 py-8 text-center text-xs text-gray-400 mt-auto">
            <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-6">
                <span className="mb-4 md:mb-0">© 2026 Lost & Found. Tous droits réservés.</span>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-gray-600">Conditions</a>
                    <a href="#" className="hover:text-gray-600">Confidentialité</a>
                    <a href="#" className="hover:text-gray-600">Contact</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
