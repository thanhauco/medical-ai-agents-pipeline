import { useState, useCallback, useRef } from 'react';
import { AGENTS, SAMPLE_SCENARIOS } from '../data/mockData';

export const usePipeline = () => {
    const [status, setStatus] = useState('idle'); // idle, processing, pending_review, complete
    const [currentStep, setCurrentStep] = useState(-1);
    const [logs, setLogs] = useState([]);
    const [results, setResults] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [selectedScenarioId, setSelectedScenarioId] = useState(SAMPLE_SCENARIOS[0].id);
    const [settings, setSettings] = useState({
        anonymizationStrength: 'High',
        enableDifferentialPrivacy: true,
        modelConsensus: true
    });

    const timerRef = useRef(null);

    const reset = useCallback(() => {
        setStatus('idle');
        setCurrentStep(-1);
        setLogs([]);
        setResults(null);
        setUploadedFile(null);
        if (timerRef.current) clearTimeout(timerRef.current);
    }, []);

    const runPipeline = useCallback(async () => {
        if (!uploadedFile) return;

        setStatus('processing');
        setLogs([{ message: 'Starting pipeline...', data: { timestamp: new Date().toISOString() } }]);

        // Process agents 0 to 6 (Parser to Peer Review)
        for (let i = 0; i < 7; i++) {
            setCurrentStep(i);
            const agent = AGENTS[i];

            for (const log of agent.logs) {
                setLogs(prev => [...prev, { ...log, agent: agent.name }]);
                await new Promise(resolve => setTimeout(resolve, 400));
            }

            await new Promise(resolve => setTimeout(resolve, 800));
        }

        // HITL Review Step (after Peer Review)
        setStatus('pending_review');
        setLogs(prev => [...prev, { message: 'Pipeline paused for clinical review.', data: { action_required: 'Approve findings' }, agent: 'System' }]);
    }, [uploadedFile, selectedScenarioId]);

    const approveFindings = useCallback(async () => {
        if (status !== 'pending_review') return;

        setStatus('processing');

        // Process remaining agents (Explainability to Pharmacogenomics)
        for (let i = 7; i < AGENTS.length; i++) {
            setCurrentStep(i);
            const agent = AGENTS[i];

            for (const log of agent.logs) {
                setLogs(prev => [...prev, { ...log, agent: agent.name }]);
                await new Promise(resolve => setTimeout(resolve, 400));
            }

            await new Promise(resolve => setTimeout(resolve, 800));
        }

        const scenario = SAMPLE_SCENARIOS.find(s => s.id === selectedScenarioId) || SAMPLE_SCENARIOS[0];
        setCurrentStep(AGENTS.length);
        setResults(scenario);
        setStatus('complete');
        setLogs(prev => [...prev, { message: 'Pipeline processing complete.', data: { status: 'success' }, agent: 'System' }]);
    }, [status, selectedScenarioId]);

    const handleFileUpload = useCallback((file) => {
        setUploadedFile(file);
    }, []);

    const updateSettings = useCallback((newSettings) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    }, []);

    const exportFHIR = useCallback(() => {
        if (!results) return;
        const fhirBundle = {
            resourceType: 'Bundle',
            type: 'collection',
            entry: [
                { resource: { resourceType: 'Patient', id: results.patientData.demographics.id } },
                { resource: { resourceType: 'Observation', code: { text: 'Diagnosis' }, valueString: results.results.diagnosis } }
            ]
        };
        const blob = new Blob([JSON.stringify(fhirBundle, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `fhir-bundle-${results.patientData.demographics.id}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }, [results]);

    return {
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
        agents: AGENTS,
        scenarios: SAMPLE_SCENARIOS
    };
};
