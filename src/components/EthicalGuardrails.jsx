import React from 'react';
import { motion } from 'framer-motion';
import { Scale, ShieldCheck, AlertCircle, CheckCircle2, Lock } from 'lucide-react';

const EthicalGuardrails = ({ ethics }) => {
    if (!ethics) return null;

    return (
        <div className="p-8 rounded-[2.5rem] glass-card border-teal-500/20 bg-teal-500/5 group/ethics">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-teal-500/10 shadow-inner">
                        <Scale className="w-6 h-6 text-teal-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">Ethical Guardrails</h3>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mt-1">AI Fairness & Compliance</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-bold uppercase tracking-widest">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Audited
                </div>
            </div>

            <div className="mb-8">
                <div className="flex justify-between items-end mb-3">
                    <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Fairness Score</span>
                    <span className="text-teal-400 font-black text-2xl tracking-tighter">{ethics.fairnessScore}%</span>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800/50 p-0.5">
                    <motion.div
                        className="h-full bg-gradient-to-r from-teal-600 to-teal-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${ethics.fairnessScore}%` }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                    />
                </div>
            </div>

            <div className="space-y-3 mb-8">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-4">Bias Mitigation Steps</p>
                {ethics.biasMitigation.map((step, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-800 group-hover/ethics:border-teal-500/20 transition-all">
                        <span className="text-[11px] text-slate-300 font-medium">{step.step}</span>
                        <div className="flex items-center gap-1.5 text-teal-400 text-[9px] font-black uppercase">
                            <CheckCircle2 className="w-3 h-3" />
                            {step.status}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap gap-2">
                {ethics.compliance.map((cert, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        <Lock className="w-3 h-3" />
                        {cert}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EthicalGuardrails;
