import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp, Target, Activity } from 'lucide-react';

const HealthTrajectory = ({ trajectory }) => {
    if (!trajectory) return null;

    const maxVal = Math.max(...trajectory.data.map(d => d.value), trajectory.baseline);
    const minVal = Math.min(...trajectory.data.map(d => d.value), trajectory.target);
    const range = maxVal - minVal;

    return (
        <div className="p-8 rounded-[2.5rem] glass-card border-purple-500/20 bg-purple-500/5 group/trajectory">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-purple-500/10 shadow-inner">
                        <Activity className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">Health Trajectory</h3>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mt-1">12-Month Prediction</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-widest">
                    <Target className="w-3.5 h-3.5" />
                    Target: {trajectory.target}
                </div>
            </div>

            <div className="relative h-48 mb-8 flex items-end justify-between px-4">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                    {[0, 1, 2, 3].map(i => (
                        <div key={i} className="w-full border-t border-slate-400" />
                    ))}
                </div>

                {/* Data points and lines */}
                {trajectory.data.map((point, i) => {
                    const height = ((point.value - minVal) / range) * 100;
                    const isTargetReached = point.value <= trajectory.target;

                    return (
                        <div key={i} className="relative flex flex-col items-center group/point">
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${height}%` }}
                                transition={{ duration: 1, delay: i * 0.1 }}
                                className={`w-1.5 rounded-full mb-2 ${isTargetReached ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-purple-500'}`}
                            />
                            <div className={`w-3 h-3 rounded-full absolute bottom-[calc(${height}%+8px)] transition-all duration-500 ${isTargetReached ? 'bg-green-400 scale-125' : 'bg-purple-400'
                                } group-hover/point:scale-150 group-hover/point:shadow-[0_0_15px_rgba(168,85,247,0.5)]`} />

                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{point.month}</span>
                            <span className="absolute -top-8 text-[10px] font-bold text-white opacity-0 group-hover/point:opacity-100 transition-opacity bg-slate-800 px-2 py-1 rounded-lg">
                                {point.value}
                            </span>
                        </div>
                    );
                })}

                {/* Target Line */}
                <div
                    className="absolute left-0 right-0 border-t-2 border-dashed border-green-500/30 pointer-events-none"
                    style={{ bottom: `${((trajectory.target - minVal) / range) * 100}%` }}
                >
                    <span className="absolute -right-2 -top-2.5 text-[8px] font-black text-green-500 uppercase bg-[#030712] px-1">Target</span>
                </div>
            </div>

            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex gap-4">
                <div className="p-2 rounded-xl bg-purple-500/20 shrink-0">
                    <TrendingDown className="w-4 h-4 text-purple-400" />
                </div>
                <p className="text-[10px] text-purple-200 leading-relaxed font-medium italic">
                    Longitudinal tracking predicts a {Math.round(((trajectory.baseline - trajectory.data[4].value) / trajectory.baseline) * 100)}% improvement in {trajectory.metric} over the next 12 months with strict adherence to the recommended treatment plan.
                </p>
            </div>
        </div>
    );
};

export default HealthTrajectory;
