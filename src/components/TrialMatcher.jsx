import React from 'react';
import { motion } from 'framer-motion';
import { Search, ExternalLink, Beaker, CheckCircle2, AlertCircle } from 'lucide-react';

const TrialMatcher = ({ trials }) => {
    if (!trials || trials.length === 0) return null;

    return (
        <div className="p-8 rounded-[2.5rem] glass-card border-pink-500/20 bg-pink-500/5 group/trials">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-pink-500/10 shadow-inner">
                        <Search className="w-6 h-6 text-pink-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">Clinical Trial Matcher</h3>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mt-1">Global Opportunities</p>
                    </div>
                </div>
                <div className="p-2 rounded-xl bg-pink-500/10">
                    <Beaker className="w-5 h-5 text-pink-400 animate-bounce" />
                </div>
            </div>

            <div className="space-y-4">
                {trials.map((trial, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ x: 4 }}
                        className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-pink-500/30 transition-all duration-500 group/item"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest">{trial.id} • {trial.phase}</span>
                                <h4 className="text-sm font-bold text-white mt-1 group-hover/item:text-pink-400 transition-colors">{trial.title}</h4>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-1 text-green-400 text-xs font-bold">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    {trial.match}% Match
                                </div>
                                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Eligibility: {trial.eligibility}</span>
                            </div>
                        </div>

                        <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2 mb-4">
                            {trial.description}
                        </p>

                        <button className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                            View Trial Details
                            <ExternalLink className="w-3 h-3" />
                        </button>
                    </motion.div>
                ))}
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex gap-4">
                <div className="p-2 rounded-xl bg-pink-500/20 shrink-0">
                    <AlertCircle className="w-4 h-4 text-pink-400" />
                </div>
                <p className="text-[10px] text-pink-200 leading-relaxed font-medium italic">
                    Trial matching is based on current clinical status and regional availability. Consult with your primary physician before enrolling in any clinical study.
                </p>
            </div>
        </div>
    );
};

export default TrialMatcher;
