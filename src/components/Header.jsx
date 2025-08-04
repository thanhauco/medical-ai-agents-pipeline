import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Shield, Zap, Heart } from 'lucide-react';

const Header = ({ status }) => {
    return (
        <header className="relative py-12 mb-8 overflow-hidden">
            {/* Animated background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                <div className="absolute top-[-50%] left-[-10%] w-[60%] h-[150%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[150%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3"
                        >
                            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/20">
                                <Activity className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xs font-bold text-blue-400 uppercase tracking-[0.3em]">Advanced Medical Intelligence</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]"
                        >
                            Medical AI <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                                Agents Pipeline
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-400 text-lg max-w-2xl leading-relaxed font-light"
                        >
                            A state-of-the-art 10-agent multi-modal system for explainable diagnostics,
                            clinical peer review, and global health analytics.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-6 p-2 rounded-3xl glass-card pr-8"
                    >
                        <div className={`p-4 rounded-2xl transition-all duration-500 ${status === 'complete' ? 'bg-green-500/20 text-green-400' :
                                status === 'pending_review' ? 'bg-yellow-500/20 text-yellow-400' :
                                    status === 'processing' ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800/50 text-slate-500'
                            }`}>
                            {status === 'complete' ? <Shield className="w-8 h-8" /> :
                                status === 'pending_review' ? <Zap className="w-8 h-8" /> :
                                    status === 'processing' ? <Activity className="w-8 h-8 animate-spin-slow" /> : <Heart className="w-8 h-8" />}
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">System Status</p>
                            <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${status === 'complete' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' :
                                        status === 'pending_review' ? 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]' :
                                            status === 'processing' ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] animate-pulse' : 'bg-slate-600'
                                    }`} />
                                <p className="text-white font-bold text-lg capitalize">{status.replace('_', ' ')}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </header>
    );
};

export default Header;
