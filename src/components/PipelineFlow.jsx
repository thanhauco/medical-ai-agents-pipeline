import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const PipelineFlow = ({ agents, currentStep }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12 border-t border-slate-800">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-[0.2em] mb-8 text-center">
                Pipeline Architecture Flow
            </h2>

            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
                <div className="flex flex-col items-center gap-2">
                    <div className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700">
                        DOCUMENTS
                    </div>
                </div>

                {agents.map((agent, index) => (
                    <React.Fragment key={agent.id}>
                        <ArrowRight className={`w-4 h-4 ${currentStep >= index ? 'text-blue-500' : 'text-slate-700'}`} />

                        <div className="flex flex-col items-center gap-2">
                            <div className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all duration-500 ${currentStep === index
                                    ? `${agent.bgColor} bg-opacity-20 ${agent.color} border-white/30 scale-110 shadow-lg shadow-blue-900/20`
                                    : currentStep > index
                                        ? 'bg-slate-800 text-slate-400 border-slate-700'
                                        : 'bg-slate-900 text-slate-600 border-slate-800'
                                }`}>
                                {agent.name.split(' ').pop().toUpperCase()}
                            </div>
                        </div>
                    </React.Fragment>
                ))}

                <ArrowRight className={`w-4 h-4 ${currentStep >= agents.length ? 'text-green-500' : 'text-slate-700'}`} />

                <div className="flex flex-col items-center gap-2">
                    <div className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all duration-500 ${currentStep >= agents.length
                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                            : 'bg-slate-900 text-slate-600 border-slate-800'
                        }`}>
                        DIAGNOSIS
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PipelineFlow;
