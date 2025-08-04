import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, RotateCcw, CheckCircle2,
  AlertCircle, ShieldCheck, ChevronRight,
  Brain, Activity, Stethoscope
} from 'lucide-react';
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import AgentCard from './components/AgentCard';
import ResultsDashboard from './components/ResultsDashboard';
import { usePipeline } from './hooks/usePipeline';

function App() {
  const {
    status,
    currentStep,
    logs,
    results,
    uploadedFile,
    selectedScenarioId,
    setSelectedScenarioId,
    settings,
    updateSettings,
    runPipeline,
    approveFindings,
    reset,
    handleFileUpload,
    exportFHIR,
    agents,
    scenarios
  } = usePipeline();

  const progress = status === 'complete' ? 100 : Math.max(0, (currentStep / agents.length) * 100);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Premium Background Mesh */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-pink-600/5 blur-[100px] rounded-full" />
      </div>

      <Header status={status} progress={progress} />

      <main className="relative z-10 pt-32 px-6 pb-20">
        <div className="max-w-[1600px] mx-auto space-y-12">

          {/* Top Section: Controls & Pipeline Status */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-1">
              <ControlPanel
                status={status}
                onRun={runPipeline}
                onReset={reset}
                onFileUpload={handleFileUpload}
                uploadedFile={uploadedFile}
                scenarios={scenarios}
                selectedScenarioId={selectedScenarioId}
                onScenarioChange={setSelectedScenarioId}
                settings={settings}
                onSettingsChange={updateSettings}
              />
            </div>

            <div className="xl:col-span-3 space-y-8">
              {/* Pipeline Visualization */}
              <div className="p-8 rounded-[2.5rem] glass-card border-slate-800/50">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-blue-500/10 shadow-inner">
                      <Activity className="w-6 h-6 text-blue-400" />
                    </div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Multi-Agent Pipeline</h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Agents</span>
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">14</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  {agents.map((agent, index) => (
                    <AgentCard
                      key={agent.id}
                      agent={agent}
                      index={index}
                      currentStep={currentStep}
                      status={status}
                    />
                  ))}
                </div>
              </div>

              {/* Real-time Logs */}
              <div className="p-8 rounded-[2.5rem] glass-card border-slate-800/50 h-[320px] flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-2.5 rounded-xl bg-slate-800/50">
                    <Brain className="w-5 h-5 text-slate-400" />
                  </div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em]">System Intelligence Logs</h3>
                </div>
                <div className="flex-1 overflow-y-auto space-y-3 pr-4 custom-scrollbar">
                  <AnimatePresence mode="popLayout">
                    {logs.map((log, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/50 group hover:border-blue-500/20 transition-all"
                      >
                        <span className="text-[10px] font-black text-blue-500/50 uppercase tracking-widest w-24 shrink-0 group-hover:text-blue-400 transition-colors">
                          {log.agent || 'System'}
                        </span>
                        <div className="flex-1">
                          <p className="text-xs text-slate-300 font-medium leading-relaxed">{log.message}</p>
                          {log.data && (
                            <pre className="mt-2 text-[10px] text-slate-500 font-mono bg-black/30 p-2 rounded-lg border border-slate-800/50 overflow-x-auto">
                              {JSON.stringify(log.data, null, 2)}
                            </pre>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {status === 'processing' && (
                    <div className="flex items-center gap-3 p-4">
                      <div className="flex gap-1">
                        {[0, 1, 2].map(i => (
                          <motion.div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-blue-500"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Agent reasoning in progress...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* HITL Review Banner */}
          <AnimatePresence>
            {status === 'pending_review' && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-full max-w-2xl px-6"
              >
                <div className="p-8 rounded-[2.5rem] glass-card border-yellow-500/30 bg-yellow-500/5 shadow-[0_20px_50px_rgba(234,179,8,0.2)] backdrop-blur-3xl">
                  <div className="flex items-center gap-6">
                    <div className="p-4 rounded-2xl bg-yellow-500/20 shadow-inner">
                      <ShieldCheck className="w-8 h-8 text-yellow-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white tracking-tight">Clinical Validation Required</h3>
                      <p className="text-sm text-slate-400 mt-1 font-medium">Initial analysis complete. Please review findings and approve to generate final reports.</p>
                    </div>
                    <button
                      onClick={approveFindings}
                      className="px-8 py-4 rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase tracking-widest text-xs shadow-xl shadow-yellow-900/20 transition-all hover:scale-105 active:scale-95"
                    >
                      Approve & Finalize
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Dashboard */}
          <AnimatePresence>
            {status === 'complete' && results && (
              <ResultsDashboard results={results} onExportFHIR={exportFHIR} />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default App;
