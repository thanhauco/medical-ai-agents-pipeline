import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Users, Clock, ShieldCheck, Sparkles } from 'lucide-react';

const LiveReview = ({ board }) => {
    if (!board || board.length === 0) return null;

    return (
        <div className="p-8 rounded-[2.5rem] glass-card border-blue-500/20 bg-blue-500/5 group/board">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-blue-500/10 shadow-inner">
                        <Users className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">Collaborative AI Board</h3>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mt-1">Live Multi-Agent Review</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-green-500/10 text-green-400 text-[10px] font-bold border border-green-500/20 shadow-lg shadow-green-900/10">
                    <ShieldCheck className="w-4 h-4" />
                    Consensus Reached
                </div>
            </div>

            <div className="space-y-4">
                {board.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.2 }}
                        className="flex gap-4 p-5 rounded-2xl bg-slate-900/40 border border-slate-800/50 hover:border-blue-500/30 transition-all duration-500 group/msg"
                    >
                        <div className="shrink-0">
                            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-blue-400 group-hover/msg:bg-blue-500 group-hover/msg:text-white transition-all duration-500">
                                <MessageSquare className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{item.agent}</span>
                                <div className="flex items-center gap-1 text-[9px] text-slate-500 font-bold">
                                    <Clock className="w-3 h-3" />
                                    {item.timestamp}
                                </div>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed font-medium">
                                {item.comment}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] animate-pulse">
                    <Sparkles className="w-4 h-4" />
                    Board Simulation Active
                </div>
            </div>
        </div>
    );
};

export default LiveReview;
