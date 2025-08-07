import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Upload, Play, RotateCcw, ChevronDown,
    Settings, Shield, Lock, Users, Check, X,
    FileText, Database, Info
} from 'lucide-react';

const ControlPanel = ({
    onUpload,
    onRun,
    onReset,
    uploadedFile,
    status,
    progress,
    scenarios,
    selectedScenarioId,
    onScenarioChange,
    settings,
    onSettingsChange
}) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return (
        <div className="max-w-7xl mx-auto px-4 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* Scenario & Settings Column */}
                <div className="lg:col-span-1 flex flex-col gap-4">
                    <div className="p-6 rounded-3xl glass-card border-slate-700/50 group hover:border-blue-500/30 transition-all duration-500">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 block">
                            Medical Scenario
                        </label>
                        <div className="relative">
                            <select
                                value={selectedScenarioId}
                                onChange={(e) => onScenarioChange(e.target.value)}
                                disabled={status !== 'idle'}
                                className="w-full bg-slate-900/80 border border-slate-700 rounded-2xl py-3.5 pl-4 pr-10 text-sm text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                            >
                                {scenarios.map(s => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                        </div>
                    </div>

                    <button
                        onClick={() => setIsSettingsOpen(true)}
                        className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white font-bold transition-all border border-slate-700/50 hover:border-slate-600 group"
                    >
                        <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
                        Agent Settings
                    </button>
                </div>

                {/* Upload & Action Column */}
                <div className="lg:col-span-3">
                    <div className="p-8 rounded-[2rem] glass-card border-slate-700/50 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full -mr-32 -mt-32" />

                        <div className="flex-1 w-full">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-blue-500/10">
                                        <Database className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white">Data Ingestion</h3>
                                </div>
                                {uploadedFile && (
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-wider">
                                        <Check className="w-3 h-3" />
                                        Ready to Process
                                    </div>
                                )}
                            </div>

                            <div className="relative group">
                                <input
                                    type="file"
                                    onChange={(e) => onUpload(e.target.files[0])}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    disabled={status !== 'idle'}
                                />
                                <div className={`p-8 rounded-2xl border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center gap-4 ${uploadedFile
                                        ? 'bg-blue-500/5 border-blue-500/30'
                                        : 'bg-slate-900/50 border-slate-800 group-hover:border-slate-700 group-hover:bg-slate-900'
                                    }`}>
                                    <div className={`p-4 rounded-full transition-all duration-500 ${uploadedFile ? 'bg-blue-500 text-white scale-110' : 'bg-slate-800 text-slate-500'}`}>
                                        <Upload className="w-6 h-6" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-bold text-white mb-1">
                                            {uploadedFile ? uploadedFile.name : 'Upload Medical Records'}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {uploadedFile ? `${(uploadedFile.size / 1024).toFixed(1)} KB • PDF, DICOM, HL7` : 'Drag and drop or click to browse'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 w-full md:w-64 shrink-0">
                            <button
                                onClick={onRun}
                                disabled={!uploadedFile || status !== 'idle'}
                                className={`flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-bold transition-all shadow-xl ${!uploadedFile || status !== 'idle'
                                        ? 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700'
                                        : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-blue-900/20 hover:scale-[1.02] active:scale-[0.98]'
                                    }`}
                            >
                                <Play className={`w-5 h-5 ${status === 'processing' ? 'animate-pulse' : ''}`} />
                                {status === 'idle' ? 'Run Pipeline' : 'Processing...'}
                            </button>

                            <button
                                onClick={onReset}
                                className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white font-bold transition-all border border-slate-700/50 hover:border-slate-600"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Reset System
                            </button>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <AnimatePresence>
                        {(status === 'processing' || status === 'pending_review' || status === 'complete') && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="mt-6 px-2"
                            >
                                <div className="flex justify-between items-end mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Pipeline Progress</span>
                                        <span className="text-xs font-bold text-white">{Math.round(progress)}%</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                        {status === 'pending_review' ? 'Awaiting Approval' : status === 'complete' ? 'Analysis Ready' : 'Processing Agents...'}
                                    </span>
                                </div>
                                <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-purple-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Settings Modal */}
            <AnimatePresence>
                {isSettingsOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="w-full max-w-lg glass-card rounded-[2.5rem] border-slate-700 overflow-hidden shadow-2xl"
                        >
                            <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-2xl bg-blue-500/10">
                                        <Settings className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white tracking-tight">Agent Configuration</h3>
                                        <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Global Pipeline Settings</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsSettingsOpen(false)}
                                    className="p-2 rounded-xl hover:bg-slate-800 text-slate-500 hover:text-white transition-all"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-8 space-y-8">
                                {/* Anonymization Strength */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Lock className="w-4 h-4 text-yellow-500" />
                                        <label className="text-sm font-bold text-white uppercase tracking-wider">Anonymization Strength</label>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        {['Low', 'Medium', 'High'].map(level => (
                                            <button
                                                key={level}
                                                onClick={() => onSettingsChange({ anonymizationStrength: level })}
                                                className={`py-3 rounded-2xl text-xs font-bold transition-all border ${settings.anonymizationStrength === level
                                                        ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50 shadow-lg shadow-yellow-900/10'
                                                        : 'bg-slate-800/50 text-slate-500 border-transparent hover:border-slate-700'
                                                    }`}
                                            >
                                                {level}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Toggles */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all group">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2.5 rounded-xl bg-green-500/10 text-green-400">
                                                <Shield className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white">Differential Privacy</p>
                                                <p className="text-[10px] text-slate-500 font-medium">Add noise to prevent re-identification</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => onSettingsChange({ enableDifferentialPrivacy: !settings.enableDifferentialPrivacy })}
                                            className={`w-14 h-7 rounded-full transition-all relative p-1 ${settings.enableDifferentialPrivacy ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'bg-slate-700'}`}
                                        >
                                            <div className={`w-5 h-5 rounded-full bg-white transition-all shadow-sm ${settings.enableDifferentialPrivacy ? 'translate-x-7' : 'translate-x-0'}`} />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all group">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                                                <Users className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white">Model Consensus</p>
                                                <p className="text-[10px] text-slate-500 font-medium">Require multi-model agreement</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => onSettingsChange({ modelConsensus: !settings.modelConsensus })}
                                            className={`w-14 h-7 rounded-full transition-all relative p-1 ${settings.modelConsensus ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-slate-700'}`}
                                        >
                                            <div className={`w-5 h-5 rounded-full bg-white transition-all shadow-sm ${settings.modelConsensus ? 'translate-x-7' : 'translate-x-0'}`} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 bg-slate-900/30 border-t border-slate-800 flex justify-end">
                                <button
                                    onClick={() => setIsSettingsOpen(false)}
                                    className="px-10 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-900/20 active:scale-95"
                                >
                                    Save Configuration
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ControlPanel;
