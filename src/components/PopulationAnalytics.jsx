import React from 'react';
import { motion } from 'framer-motion';
import { Globe, TrendingUp, Users, DollarSign, BarChart3, PieChart, Sparkles } from 'lucide-react';

const PopulationAnalytics = ({ population, costs }) => {
    if (!population || !costs) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Population Comparison */}
            <div className="p-8 rounded-[2.5rem] glass-card border-green-500/20 bg-green-500/5 group/pop">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-green-500/10 shadow-inner">
                            <Users className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white tracking-tight">Population Comparison</h3>
                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mt-1">Cohort Analysis</p>
                        </div>
                    </div>
                    <div className="p-2 rounded-xl bg-green-500/10">
                        <Sparkles className="w-4 h-4 text-green-400 animate-pulse" />
                    </div>
                </div>

                <div className="space-y-8">
                    <div>
                        <div className="flex justify-between items-end mb-3">
                            <span className="text-slate-400 text-xs font-medium">Cohort Percentile</span>
                            <span className="text-green-400 font-bold text-2xl tracking-tight">{population.percentile}th</span>
                        </div>
                        <div className="h-5 w-full bg-slate-900 rounded-full overflow-hidden relative border border-slate-800 p-1">
                            <motion.div
                                className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                                initial={{ width: 0 }}
                                animate={{ width: `${population.percentile}%` }}
                                transition={{ duration: 2, ease: "circOut" }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-[9px] font-bold text-white uppercase tracking-tighter drop-shadow-md">
                                    Case vs {population.cohortSize.toLocaleString()} Patients
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 group-hover/pop:border-green-500/20 transition-all duration-500">
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Regional Trend</span>
                            </div>
                            <p className="text-sm text-white font-bold">{population.regionalTrend}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 group-hover/pop:border-green-500/20 transition-all duration-500">
                            <div className="flex items-center gap-2 mb-2">
                                <BarChart3 className="w-3.5 h-3.5 text-purple-400" />
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Cohort Avg</span>
                            </div>
                            <p className="text-sm text-white font-bold">{population.avgHba1c || population.avgWbc} (Baseline)</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Treatment Cost Estimator */}
            <div className="p-8 rounded-[2.5rem] glass-card border-blue-500/20 bg-blue-500/5 group/cost">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-blue-500/10 shadow-inner">
                            <DollarSign className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white tracking-tight">Cost Estimator</h3>
                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mt-1">Regional Averages</p>
                        </div>
                    </div>
                    <div className="p-2 rounded-xl bg-blue-500/10">
                        <Globe className="w-4 h-4 text-blue-400" />
                    </div>
                </div>

                <div className="space-y-4">
                    {Object.entries(costs).map(([key, value]) => {
                        if (key === 'total' || key === 'currency') return null;
                        return (
                            <div key={key} className="flex justify-between items-center py-3 border-b border-slate-800/50 group-hover/cost:border-blue-500/10 transition-all duration-500">
                                <span className="text-xs text-slate-400 capitalize font-medium">{key}</span>
                                <span className="text-xs text-white font-mono font-bold">{costs.currency} {value}</span>
                            </div>
                        );
                    })}
                    <div className="flex justify-between items-center pt-6 mt-2">
                        <span className="text-sm font-bold text-white uppercase tracking-[0.2em]">Estimated Total</span>
                        <span className="text-2xl font-bold text-blue-400 font-mono drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                            {costs.currency} {costs.total}
                        </span>
                    </div>
                </div>

                <div className="mt-8 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex gap-4">
                    <div className="p-2 rounded-xl bg-blue-500/20 shrink-0">
                        <Info className="w-4 h-4 text-blue-400" />
                    </div>
                    <p className="text-[10px] text-blue-200 leading-relaxed font-medium italic">
                        Estimates are calculated using current regional data for {population.regionalTrend.includes('Seasonal') ? 'the European Union' : 'North America'}. Final costs may vary by insurance provider.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PopulationAnalytics;
