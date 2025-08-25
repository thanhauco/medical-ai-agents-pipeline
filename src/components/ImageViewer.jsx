import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, ZoomIn, ZoomOut, Layers, Info, Shield, Sparkles } from 'lucide-react';

const ImageViewer = ({ imaging }) => {
    const [showHeatmap, setShowHeatmap] = useState(true);
    const [showBoxes, setShowBoxes] = useState(true);
    const [selectedRegion, setSelectedRegion] = useState(null);

    if (!imaging) return null;

    return (
        <div className="p-8 rounded-[2.5rem] glass-card overflow-hidden group/viewer">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-blue-500/10 shadow-inner">
                        <Layers className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">AI Imaging Analysis</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em]">{imaging.type}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-700" />
                            <div className="flex items-center gap-1">
                                <Sparkles className="w-3 h-3 text-blue-400" />
                                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Enhanced</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 p-1.5 rounded-2xl bg-slate-900/50 border border-slate-800/50">
                    <button
                        onClick={() => setShowHeatmap(!showHeatmap)}
                        className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-all border ${showHeatmap ? 'bg-orange-500/20 text-orange-400 border-orange-500/50 shadow-lg shadow-orange-900/10' : 'bg-transparent text-slate-500 border-transparent hover:text-slate-400'
                            }`}
                    >
                        Heatmap
                    </button>
                    <button
                        onClick={() => setShowBoxes(!showBoxes)}
                        className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-all border ${showBoxes ? 'bg-blue-500/20 text-blue-400 border-blue-500/50 shadow-lg shadow-blue-900/10' : 'bg-transparent text-slate-500 border-transparent hover:text-slate-400'
                            }`}
                    >
                        Bounding Boxes
                    </button>
                </div>
            </div>

            <div className="relative aspect-square bg-black rounded-[2rem] border border-slate-800 overflow-hidden group shadow-2xl">
                {/* Simulated Medical Image (Gradient/Noise) */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-900 opacity-80" />
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                {/* Simulated Heatmap */}
                <AnimatePresence>
                    {showHeatmap && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-gradient-to-tr from-blue-600 via-transparent to-orange-600 blur-[80px] pointer-events-none"
                        />
                    )}
                </AnimatePresence>

                {/* Bounding Boxes */}
                {showBoxes && imaging.regions.map((region, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + (i * 0.2) }}
                        onMouseEnter={() => setSelectedRegion(region)}
                        onMouseLeave={() => setSelectedRegion(null)}
                        className="absolute border-2 border-blue-500/40 bg-blue-500/5 cursor-help transition-all hover:border-blue-400 hover:bg-blue-500/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                        style={{
                            left: `${(region.x / 400) * 100}%`,
                            top: `${(region.y / 400) * 100}%`,
                            width: `${(region.w / 400) * 100}%`,
                            height: `${(region.h / 400) * 100}%`
                        }}
                    >
                        <div className="absolute -top-7 left-0 bg-blue-600 text-white text-[9px] font-bold px-2 py-1 rounded-lg shadow-lg whitespace-nowrap">
                            {region.label} ({Math.round(region.confidence * 100)}%)
                        </div>
                    </motion.div>
                ))}

                {/* Region Detail Overlay */}
                <AnimatePresence>
                    {selectedRegion && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl glass-card border-blue-500/30 bg-blue-900/40 backdrop-blur-xl shadow-2xl"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-1.5 rounded-lg bg-blue-500/20">
                                    <Info className="w-4 h-4 text-blue-400" />
                                </div>
                                <span className="text-xs font-bold text-white uppercase tracking-widest">{selectedRegion.label}</span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed font-medium">
                                AI detected {selectedRegion.label.toLowerCase()} with {Math.round(selectedRegion.confidence * 100)}% confidence. This finding correlates with the clinical diagnosis and lab results.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Controls Overlay */}
                <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                    <button className="p-3 rounded-xl bg-black/60 text-white hover:bg-blue-600 transition-all backdrop-blur-md border border-white/10 shadow-xl"><ZoomIn className="w-5 h-5" /></button>
                    <button className="p-3 rounded-xl bg-black/60 text-white hover:bg-blue-600 transition-all backdrop-blur-md border border-white/10 shadow-xl"><ZoomOut className="w-5 h-5" /></button>
                    <button className="p-3 rounded-xl bg-black/60 text-white hover:bg-blue-600 transition-all backdrop-blur-md border border-white/10 shadow-xl"><Maximize2 className="w-5 h-5" /></button>
                </div>
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-slate-900/50 border border-slate-800/50 group-hover/viewer:border-blue-500/20 transition-all duration-500">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-1.5 rounded-lg bg-green-500/10">
                        <Shield className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Vision Agent Summary</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-medium italic">
                    "{imaging.findings}"
                </p>
            </div>
        </div>
    );
};

export default ImageViewer;
