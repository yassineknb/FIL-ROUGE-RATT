import React from 'react';

const AuthLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen w-full font-sans">
            {/* Left Panel - Dark */}
            <div className="hidden lg:flex lg:w-1/3 bg-[#0F172A] text-white flex-col justify-between p-12 relative overflow-hidden">
                {/* Logo Area */}
                <div className="z-10 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-[#0F172A] font-bold text-xs">
                        LF
                    </div>
                    <div>
                        <h1 className="font-bold text-lg leading-tight">Lost & Found</h1>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">Declare. Find. Recover.</p>
                    </div>
                </div>

                {/* Hero Text */}
                <div className="z-10 mb-20">
                    <h2 className="text-4xl font-bold mb-4 leading-tight">
                        Connecte-toi pour <br />
                        <span className="text-yellow-400">déclarer</span> et <span className="text-yellow-400">retrouver</span>.
                    </h2>
                    <p className="text-gray-400 text-sm max-w-sm">
                        Une interface simple pour consulter les déclarations, filtrer par lieu et gérer tes objets.
                    </p>
                </div>

                {/* Footer Text */}
                <div className="z-10 text-xs text-gray-500">
                    Lost & Found — Auth simple et rapide.
                </div>

                {/* Background Decorative Blur (Optional aesthetic) */}
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute top-20 right-[-100px] w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
            </div>

            {/* Right Panel - Light */}
            <div className="flex-1 flex flex-col relative bg-[#F8FAFC]">
                <div className="flex-1 flex items-center justify-center p-6">
                    {children}
                </div>

                {/* Footer */}
                <div className="py-6 text-center text-xs text-gray-400 flex gap-6 justify-center">
                    <span>© 2026 Lost & Found. Tous droits réservés.</span>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-gray-600">Conditions</a>
                        <a href="#" className="hover:text-gray-600">Confidentialité</a>
                        <a href="#" className="hover:text-gray-600">Contact</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
