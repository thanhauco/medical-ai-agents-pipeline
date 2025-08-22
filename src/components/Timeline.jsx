import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Activity } from 'lucide-react';

const Timeline = ({ history }) => {
    if (!history || history.length === 0) return null;

    return (
        <div className="relative pl-10 space-y-10 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-blue-500/50 before:via-slate-800 before:to-slate-800/20">
            {history.map((item, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative"
                >
                    <div className="absolute -left-[35px] top-1 w-6 h-6 rounded-full bg-[#030712] border-2 border-blue-500 z-10 shadow-[0_0_10px_rgba(59,130,246,0.5)] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    </div>

                    <div className="p-5 rounded-3xl glass-card border-slate-700/50 hover:border-blue-500/30 transition-all duration-500 group hover:shadow-xl hover:shadow-blue-900/10">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 rounded-lg bg-slate-800/50 text-slate-500 group-hover:text-blue-400 transition-colors">
                                <Calendar className="w-3 h-3" />
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] group-hover:text-slate-400 transition-colors">{item.date}</span>
                        </div>
                        <p className="text-slate-200 text-sm font-semibold group-hover:text-white transition-colors leading-relaxed">
                            {item.event}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default Timeline;
