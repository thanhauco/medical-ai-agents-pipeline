import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

const AgentCard = ({ agent, index, currentStep, status }) => {
    const Icon = LucideIcons[agent.icon];
    const isActive = index === currentStep;
    const isCompleted = index < currentStep || status === 'complete';
    const isPending = index > currentStep && status !== 'complete';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className={`relative p-6 rounded-[2rem] transition-all duration-500 group ${isActive
                    ? `glass-card border-${agent.color.split('-')[1]}-500/50 shadow-[0_0_30px_rgba(59,130,246,0.15)]`
                    : isCompleted
                        ? 'glass-card border-green-500/20 opacity-90'
                        : 'glass-card border-slate-800/50 opacity-60 hover:opacity-100'
                }`}
        >
            {/* Glow Effect for Active Agent */}
            {isActive && (
                <motion.div
                    layoutId="activeGlow"
                    className={`absolute inset-0 rounded-[2rem] blur-2xl opacity-20 pointer-events-none ${agent.bgColor}`}
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            )}

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                    <div className={`p-4 rounded-2xl transition-all duration-500 ${isActive ? `${agent.bgColor} text-white shadow-lg` :
                            isCompleted ? 'bg-green-500/10 text-green-400' : 'bg-slate-800/50 text-slate-500 group-hover:bg-slate-800'
                        }`}>
                        <Icon className={`w-6 h-6 ${isActive ? 'animate-pulse' : ''}`} />
                    </div>

                    {isCompleted ? (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center"
                        >
                            <LucideIcons.Check className="w-3.5 h-3.5 text-green-400" />
                        </motion.div>
                    ) : isActive ? (
                        <div className="flex gap-1">
                            {[0, 1, 2].map(i => (
                                <motion.div
                                    key={i}
                                    className={`w-1.5 h-1.5 rounded-full ${agent.color.replace('text-', 'bg-')}`}
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                                />
                            ))}
                        </div>
                    ) : null}
                </div>

                <div className="space-y-2">
                    <h3 className={`text-sm font-bold tracking-tight transition-colors duration-500 ${isActive ? 'text-white' : isCompleted ? 'text-slate-300' : 'text-slate-500 group-hover:text-slate-300'
                        }`}>
                        {agent.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium line-clamp-2 group-hover:text-slate-400 transition-colors">
                        {agent.description}
                    </p>
                </div>

                {/* Progress indicator for active agent */}
                {isActive && (
                    <div className="mt-6 h-1 w-full bg-slate-800/50 rounded-full overflow-hidden">
                        <motion.div
                            className={`h-full ${agent.color.replace('text-', 'bg-')}`}
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 5, repeat: Infinity }}
                        />
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default AgentCard;
