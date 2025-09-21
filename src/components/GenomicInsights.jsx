import React from 'react';
import { motion } from 'framer-motion';
import { Dna, AlertTriangle, CheckCircle2, Info, Sparkles } from 'lucide-react';

const GenomicInsights = ({ genomics }) => {
    if (!genomics) return null;

    return (
        <div className="p-8 rounded-[2.5rem] glass-card border-indigo-500/20 bg-indigo-500/5 group/genomics">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-indigo-500/10 shadow-inner">
                        <Dna className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">Pharmacogenomics</h3>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mt-1">Genetic Drug Response</p>
                    </div>
                </div>
                <div className="p-2 rounded-xl bg-indigo-500/10">
                    <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
                </div>
            </div>

            <div className="space-y-4">
                {genomics.variants.map((variant, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`p-5 rounded-2xl border transition-all duration-500 ${variant.risk === 'High'
                                ? 'bg-red-500/5 border-red-500/20 hover:border-red-500/40'
                                : 'bg-slate-900/50 border-slate-800 hover:border-indigo-500/30'
                            }`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-black text-white uppercase tracking-widest">{variant.gene}</span>
                                <span className="text-[10px] text-slate-500 font-bold">{variant.variant}</span>
                            </div>
                            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-tighter ${variant.risk === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                                }`}>
                                {variant.risk} Risk
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                            <div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Target Drug</p>
                                <p className="text-sm text-white font-bold">{variant.drug}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Impact</p>
                                <p className={`text-sm font-bold ${variant.risk === 'High' ? 'text-red-400' : 'text-indigo-400'}`}>{variant.impact}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-8 p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex gap-4">
                <div className="p-2 rounded-xl bg-indigo-500/20 shrink-0">
                    <Info className="w-4 h-4 text-indigo-400" />
                </div>
                <p className="text-[10px] text-indigo-200 leading-relaxed font-medium italic">
                    {genomics.summary} This data is used to optimize dosage and minimize adverse reactions.
                </p>
            </div>
        </div>
    );
};

export default GenomicInsights;
