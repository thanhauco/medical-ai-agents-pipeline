import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Activity, Beaker, Brain,
    Stethoscope, Lightbulb, ChevronRight,
    ExternalLink, Info, AlertCircle, Clock,
    ShieldCheck, MessageSquare, X, Info as InfoIcon,
    Download, Printer, Heart, TrendingUp, ShieldAlert,
    CheckCircle2, AlertTriangle, Globe, DollarSign,
    Sparkles, FileText, ArrowRight, Share2
} from 'lucide-react';
import Timeline from './Timeline';
import ImageViewer from './ImageViewer';
import PatientChatbot from './PatientChatbot';
import PopulationAnalytics from './PopulationAnalytics';
import HealthTrajectory from './HealthTrajectory';
import TrialMatcher from './TrialMatcher';
import LiveReview from './LiveReview';
import GenomicInsights from './GenomicInsights';
import EthicalGuardrails from './EthicalGuardrails';

const ResultsDashboard = ({ results, onExportFHIR }) => {
    const [selectedCitation, setSelectedCitation] = useState(null);
    const [annotations, setAnnotations] = useState({});
    const [activeAnnotation, setActiveAnnotation] = useState(null);
    const [validatedSteps, setValidatedSteps] = useState({});

    if (!results) return null;

    const { patientData, results: diagnosisResults } = results;

    const handlePrint = () => {
        window.print();
    };

    const handleAddAnnotation = (index, text) => {
        setAnnotations(prev => ({ ...prev, [index]: text }));
        setActiveAnnotation(null);
    };

    const toggleStepValidation = (index) => {
        setValidatedSteps(prev => ({ ...prev, [index]: !prev[index] }));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto px-4 pb-20 print:p-0"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 print:hidden">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Clinical Analysis Results</h2>
                    <p className="text-slate-500 text-sm mt-1 font-medium">Comprehensive multi-modal diagnostic report</p>
                </div>
                <div className="flex flex-wrap gap-4">
                    <button
                        onClick={onExportFHIR}
                        className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 font-bold transition-all border border-teal-500/20 shadow-xl backdrop-blur-xl group"
                    >
                        <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Export FHIR Bundle
                    </button>
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold transition-all border border-white/10 shadow-2xl backdrop-blur-xl group"
                    >
                        <Printer className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Generate Patient PDF
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Left Column: Patient Data & Predictions */}
                <div className="lg:col-span-1 space-y-10">
                    {/* Patient Profile */}
                    <div className="p-8 rounded-[2.5rem] glass-card group/profile">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-blue-500/10 shadow-inner">
                                    <User className="w-6 h-6 text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white tracking-tight">Patient Profile</h3>
                            </div>
                            <div className="p-2 rounded-xl bg-slate-800/50">
                                <FileText className="w-4 h-4 text-slate-500" />
                            </div>
                        </div>

                        <div className="space-y-4 mb-10">
                            <div className="flex justify-between py-3 border-b border-slate-800/50 group-hover/profile:border-blue-500/10 transition-all">
                                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Patient ID</span>
                                <span className="text-white font-mono font-bold">{patientData.demographics.id}</span>
                            </div>
                            <div className="flex justify-between py-3 border-b border-slate-800/50 group-hover/profile:border-blue-500/10 transition-all">
                                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Age / Gender</span>
                                <span className="text-white font-bold">{patientData.demographics.age} / {patientData.demographics.gender}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-6">
                                {Object.entries(patientData.vitals).map(([key, value]) => (
                                    <div key={key} className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 group-hover/profile:border-blue-500/10 transition-all">
                                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">{key}</p>
                                        <p className="text-white font-bold">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Patient History Timeline */}
                        <div className="pt-8 border-t border-slate-800/50">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-2 rounded-xl bg-blue-500/10">
                                    <Clock className="w-4 h-4 text-blue-400" />
                                </div>
                                <h4 className="text-sm font-bold text-white uppercase tracking-[0.2em]">Medical History</h4>
                            </div>
                            <Timeline history={patientData.history} />
                        </div>
                    </div>

                    {/* Diagnostic Predictions */}
                    <div className={`p-8 rounded-[2.5rem] glass-card border-2 transition-all duration-700 ${diagnosisResults.confidence < 90
                            ? 'border-yellow-500/30 bg-yellow-500/5 shadow-[0_0_40px_rgba(234,179,8,0.1)]'
                            : 'border-blue-500/20 bg-blue-500/5 shadow-[0_0_40px_rgba(59,130,246,0.1)]'
                        }`}>
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-orange-500/10 shadow-inner">
                                    <Stethoscope className="w-6 h-6 text-orange-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white tracking-tight">Diagnosis</h3>
                            </div>
                            {diagnosisResults.confidence < 90 && (
                                <motion.div
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-yellow-500/20 text-yellow-500 text-[10px] font-bold uppercase tracking-widest border border-yellow-500/30"
                                >
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    Review Advised
                                </motion.div>
                            )}
                        </div>

                        <div className="mb-8">
                            <div className="flex justify-between items-end mb-3">
                                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Primary Prediction</span>
                                <span className="text-orange-400 font-bold text-2xl tracking-tight">{diagnosisResults.confidence}% Confidence</span>
                            </div>
                            <p className="text-white text-2xl font-bold leading-tight tracking-tight">
                                {diagnosisResults.diagnosis}
                            </p>
                        </div>

                        <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden mb-10 border border-slate-800 p-0.5">
                            <motion.div
                                className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full shadow-[0_0_15px_rgba(234,88,12,0.4)]"
                                initial={{ width: 0 }}
                                animate={{ width: `${diagnosisResults.confidence}%` }}
                                transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                            />
                        </div>

                        {/* Multi-Model Comparison */}
                        <div className="space-y-4 pt-8 border-t border-slate-800/50">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Model Consensus View</p>
                                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                            </div>
                            {diagnosisResults.models.map((model, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/20 transition-all duration-500 group/model">
                                    <div>
                                        <p className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">{model.name}</p>
                                        <p className="text-[10px] text-slate-500 font-medium mt-0.5">{model.prediction}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-blue-400 tracking-tight">{model.confidence}%</p>
                                        <div className="w-16 h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden border border-slate-700/50">
                                            <motion.div
                                                className="h-full bg-blue-500"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${model.confidence}%` }}
                                                transition={{ duration: 1, delay: 1 + (i * 0.2) }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Health Risk Outlook */}
                    <div className="p-8 rounded-[2.5rem] glass-card border border-red-500/20 bg-red-500/5 group/risks">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 rounded-2xl bg-red-500/10 shadow-inner">
                                <TrendingUp className="w-6 h-6 text-red-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white tracking-tight">Health Risk Outlook</h3>
                        </div>

                        <div className="space-y-8">
                            {diagnosisResults.risks.map((risk, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-sm font-bold text-slate-300 tracking-tight">{risk.label}</span>
                                        <span className={`text-sm font-black ${risk.color} tracking-tighter`}>{risk.value}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800/50 p-0.5">
                                        <motion.div
                                            className={`h-full rounded-full ${risk.color.replace('text-', 'bg-')}`}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${risk.value}%` }}
                                            transition={{ duration: 1.5, delay: 1 + (i * 0.1), ease: "circOut" }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 p-5 rounded-2xl bg-red-500/10 border border-red-500/20 flex gap-4 group-hover/risks:border-red-500/40 transition-all duration-500">
                            <div className="p-2 rounded-xl bg-red-500/20 shrink-0">
                                <ShieldAlert className="w-5 h-5 text-red-400" />
                            </div>
                            <p className="text-[11px] text-red-200 leading-relaxed font-medium">
                                <span className="font-black uppercase tracking-widest block mb-1">Critical Insight:</span>
                                High risk of cardiovascular complications detected. Immediate lifestyle intervention and pharmacological management recommended.
                            </p>
                        </div>
                    </div>

                    {/* Phase 11: Ethical Guardrails */}
                    <EthicalGuardrails ethics={diagnosisResults.ethics} />
                </div>

                {/* Right Column: Imaging & Explainability */}
                <div className="lg:col-span-2 space-y-10">

                    {/* Imaging Section */}
                    <ImageViewer imaging={patientData.imaging} />

                    {/* Phase 11: Genomic Insights */}
                    <GenomicInsights genomics={patientData.genomics} />

                    {/* Global Health & Population Analytics (Phase 8) */}
                    <PopulationAnalytics
                        population={diagnosisResults.population}
                        costs={diagnosisResults.costs}
                    />

                    {/* Phase 10: Health Trajectory & Trials */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <HealthTrajectory trajectory={diagnosisResults.trajectory} />
                        <TrialMatcher trials={diagnosisResults.trials} />
                    </div>

                    {/* Phase 10: Live Review Board */}
                    <LiveReview board={diagnosisResults.liveBoard} />

                    {/* Explainability Section */}
                    <div className="p-10 rounded-[3rem] glass-card">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                            <div className="flex items-center gap-4">
                                <div className="p-4 rounded-2xl bg-purple-500/10 shadow-inner">
                                    <Lightbulb className="w-8 h-8 text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white tracking-tight">Clinical Reasoning</h3>
                                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mt-1">Peer Review Verified</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20 shadow-lg shadow-green-900/10">
                                <ShieldCheck className="w-5 h-5" />
                                Explainable AI Certified
                            </div>
                        </div>

                        <div className="space-y-6">
                            {diagnosisResults.reasoning.map((reason, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + (i * 0.1) }}
                                    className="relative group/reason"
                                >
                                    <div className={`flex gap-6 p-6 rounded-[2rem] transition-all duration-500 border-2 ${reason.status === 'discrepancy'
                                            ? 'bg-yellow-500/5 border-yellow-500/20 hover:border-yellow-500/40'
                                            : 'bg-slate-900/40 border-slate-800 hover:border-purple-500/30 hover:bg-slate-800/40'
                                        }`}>
                                        <div className="flex flex-col items-center gap-3 shrink-0">
                                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 ${reason.status === 'discrepancy' ? 'bg-yellow-500/20 text-yellow-400 shadow-lg shadow-yellow-900/20' : 'bg-purple-500/10 text-purple-400 group-hover/reason:bg-purple-500 group-hover/reason:text-white'
                                                }`}>
                                                <span className="font-black text-lg">{i + 1}</span>
                                            </div>
                                            <button
                                                onClick={() => toggleStepValidation(i)}
                                                className={`p-2 rounded-xl transition-all duration-500 ${validatedSteps[i] ? 'bg-green-500 text-white shadow-lg shadow-green-900/20' : 'bg-slate-800 text-slate-500 hover:text-slate-300'
                                                    }`}
                                                title={validatedSteps[i] ? "Validated by Clinician" : "Click to Validate Step"}
                                            >
                                                <CheckCircle2 className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <p className="text-slate-200 leading-relaxed font-medium text-lg">{reason.text}</p>
                                                {reason.status === 'discrepancy' && (
                                                    <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-yellow-500/20 text-yellow-500 text-[9px] font-black uppercase tracking-widest shrink-0 ml-4 border border-yellow-500/30">
                                                        <AlertTriangle className="w-4 h-4" />
                                                        Peer Discrepancy
                                                    </div>
                                                )}
                                            </div>

                                            <AnimatePresence>
                                                {reason.peerNote && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        className="mt-4 p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 text-xs font-medium flex gap-3"
                                                    >
                                                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                                        <span>{reason.peerNote}</span>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            <AnimatePresence>
                                                {annotations[i] && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        className="mt-4 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs italic font-medium flex gap-3"
                                                    >
                                                        <MessageSquare className="w-4 h-4 shrink-0 mt-0.5" />
                                                        <span>{annotations[i]}</span>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        <button
                                            onClick={() => setActiveAnnotation(i)}
                                            className="opacity-0 group-hover/reason:opacity-100 p-3 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white transition-all self-start shadow-xl"
                                        >
                                            <MessageSquare className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <AnimatePresence>
                                        {activeAnnotation === i && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                                className="absolute top-0 right-0 z-20 w-80 p-6 rounded-[2rem] glass-card border-slate-600 shadow-2xl backdrop-blur-3xl"
                                            >
                                                <div className="flex justify-between items-center mb-4">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Add Clinical Annotation</span>
                                                    <button onClick={() => setActiveAnnotation(null)} className="p-1.5 rounded-lg hover:bg-slate-800 transition-colors"><X className="w-4 h-4" /></button>
                                                </div>
                                                <textarea
                                                    autoFocus
                                                    className="w-full bg-slate-900/80 border border-slate-700 rounded-2xl p-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 mb-4 h-32 resize-none font-medium"
                                                    placeholder="Type clinical note..."
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' && !e.shiftKey) {
                                                            e.preventDefault();
                                                            handleAddAnnotation(i, e.target.value);
                                                        }
                                                    }}
                                                />
                                                <button
                                                    onClick={() => handleAddAnnotation(i, document.querySelector('textarea').value)}
                                                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-900/20"
                                                >
                                                    Save Annotation
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>

                        {/* Citations */}
                        <div className="mt-12 pt-10 border-t border-slate-800/50">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-2xl bg-pink-500/10 shadow-inner">
                                        <Brain className="w-6 h-6 text-pink-400" />
                                    </div>
                                    <h4 className="text-xl font-bold text-white tracking-tight">Knowledge Citations</h4>
                                </div>
                                <div className="p-2 rounded-xl bg-pink-500/10">
                                    <ExternalLink className="w-4 h-4 text-pink-400" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {diagnosisResults.citations.map((cite, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ scale: 1.02, y: -4 }}
                                        onClick={() => setSelectedCitation(cite)}
                                        className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-pink-500/40 transition-all duration-500 group/cite cursor-pointer relative overflow-hidden"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <span className="text-[10px] font-black text-pink-500 uppercase tracking-[0.2em]">{cite.source}</span>
                                            <InfoIcon className="w-4 h-4 text-slate-600 group-hover/cite:text-pink-400 transition-colors" />
                                        </div>
                                        <p className="text-slate-300 text-sm font-bold group-hover/cite:text-white transition-colors leading-snug">{cite.title}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Patient-Friendly Summary */}
                    <div className="p-10 rounded-[3rem] glass-card border-2 border-blue-500/20 bg-blue-500/5 group/patient">
                        <div className="flex items-center justify-between mb-10">
                            <div className="flex items-center gap-4">
                                <div className="p-4 rounded-2xl bg-blue-500/10 shadow-inner">
                                    <Heart className="w-8 h-8 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white tracking-tight">Patient Insights</h3>
                                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mt-1">Empathetic Translation</p>
                                </div>
                            </div>
                            <div className="p-3 rounded-2xl bg-blue-500/10">
                                <Sparkles className="w-6 h-6 text-blue-400 animate-pulse" />
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -left-4 top-0 text-6xl text-blue-500/20 font-serif">"</div>
                            <p className="text-slate-200 text-2xl leading-relaxed italic font-light px-4">
                                {diagnosisResults.patientFriendly}
                            </p>
                            <div className="absolute -right-4 bottom-0 text-6xl text-blue-500/20 font-serif">"</div>
                        </div>

                        <div className="mt-12 flex flex-wrap gap-4">
                            {diagnosisResults.recommendations.map((rec, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.05 }}
                                    className="px-6 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs font-bold text-slate-300 flex items-center gap-3 hover:border-blue-500/30 hover:text-white transition-all duration-500"
                                >
                                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                    {rec}
                                </motion.div>
                            ))}
                        </div>

                        <button className="w-full mt-10 py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-blue-900/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3">
                            Open Interactive Patient Guide
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Citation Modal */}
            <AnimatePresence>
                {selectedCitation && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="w-full max-w-2xl glass-card rounded-[3rem] border-slate-700 overflow-hidden shadow-2xl"
                        >
                            <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-pink-500/5">
                                <div className="flex items-center gap-5">
                                    <div className="p-4 rounded-2xl bg-pink-500/10 shadow-inner">
                                        <Brain className="w-8 h-8 text-pink-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white tracking-tight">Medical Citation Preview</h3>
                                        <p className="text-[10px] text-pink-500 font-black uppercase tracking-[0.3em] mt-1">{selectedCitation.source}</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedCitation(null)} className="p-2 rounded-xl hover:bg-slate-800 text-slate-500 hover:text-white transition-all">
                                    <X className="w-8 h-8" />
                                </button>
                            </div>
                            <div className="p-10">
                                <h4 className="text-2xl text-white font-bold mb-6 leading-tight tracking-tight">{selectedCitation.title}</h4>
                                <div className="p-8 rounded-[2rem] bg-slate-900/80 border border-slate-800 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 blur-[60px] rounded-full" />
                                    <p className="text-slate-200 text-lg leading-relaxed italic font-light relative z-10">
                                        "{selectedCitation.abstract}"
                                    </p>
                                </div>
                            </div>
                            <div className="p-8 bg-slate-900/30 border-t border-slate-800 flex justify-end">
                                <button
                                    onClick={() => setSelectedCitation(null)}
                                    className="px-12 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all shadow-xl active:scale-95"
                                >
                                    Close Preview
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Patient Chatbot */}
            <PatientChatbot
                patientFriendly={diagnosisResults.patientFriendly}
                diagnosis={diagnosisResults.diagnosis}
            />
        </motion.div>
    );
};

export default ResultsDashboard;
