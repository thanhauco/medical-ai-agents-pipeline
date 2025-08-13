export const SAMPLE_SCENARIOS = [
    {
        id: 't2d',
        name: 'Type 2 Diabetes',
        patientData: {
            demographics: { age: 58, gender: 'Male', id: 'PX-9928', region: 'North America' },
            vitals: { bp: '145/92', hr: 78, temp: '98.6°F', o2: '97%' },
            labs: { glucose: '145 mg/dL', hba1c: '7.8%', bmi: '31.2' },
            symptoms: ['Polyuria', 'Polydipsia', 'Fatigue'],
            history: [
                { date: '2022-05-10', event: 'Initial Hypertension Diagnosis' },
                { date: '2023-11-15', event: 'Family history of T2D noted' },
                { date: '2024-02-20', event: 'Elevated fasting glucose (110 mg/dL)' }
            ],
            imaging: {
                type: 'Retinal Scan',
                findings: 'Mild non-proliferative retinopathy detected.',
                regions: [
                    { x: 120, y: 80, w: 40, h: 40, label: 'Microaneurysm', confidence: 0.88 },
                    { x: 200, y: 150, w: 60, h: 60, label: 'Hard Exudate', confidence: 0.92 }
                ]
            },
            genomics: {
                variants: [
                    { gene: 'CYP2C9', variant: '*2/*3', impact: 'Reduced Metabolism', drug: 'Glimepiride', risk: 'High' },
                    { gene: 'SLC22A1', variant: 'rs622342', impact: 'Decreased Response', drug: 'Metformin', risk: 'Medium' }
                ],
                summary: "Patient carries variants associated with reduced metabolism of sulfonylureas and potentially decreased response to metformin."
            }
        },
        results: {
            diagnosis: 'Type 2 Diabetes Mellitus with Hypertension',
            confidence: 87,
            models: [
                { name: 'Med-PaLM 2', prediction: 'Type 2 Diabetes', confidence: 89 },
                { name: 'GPT-4V', prediction: 'Type 2 Diabetes', confidence: 85 }
            ],
            reasoning: [
                { text: 'Elevated fasting glucose (145 mg/dL) above normal range (<100 mg/dL)', status: 'validated' },
                { text: 'HbA1c of 7.8% indicates 3-month average hyperglycemia', status: 'validated' },
                { text: 'Blood pressure reading of 145/92 mmHg confirms Stage 1 hypertension', status: 'validated' },
                { text: 'Retinal scan shows early signs of diabetic retinopathy, supporting systemic diagnosis.', status: 'discrepancy', peerNote: 'Agent 9 notes: Retinopathy findings are early-stage; consider immediate ACE inhibitor therapy for renal protection.' }
            ],
            citations: [
                {
                    title: 'Type 2 diabetes diagnostic criteria',
                    source: 'ADA Guidelines 2024',
                    abstract: 'The American Diabetes Association (ADA) provides updated criteria for the diagnosis of diabetes, including fasting plasma glucose ≥126 mg/dL or A1C ≥6.5%.'
                }
            ],
            recommendations: [
                'Initiate metformin therapy',
                'Lifestyle modifications (diet, exercise)',
                'Blood pressure monitoring',
                'Referral to ophthalmology for retinopathy follow-up'
            ],
            risks: [
                { label: 'Cardiovascular Disease', value: 45, color: 'text-agent-risks-high' },
                { label: 'Kidney Dysfunction', value: 30, color: 'text-agent-risks-medium' },
                { label: 'Vision Loss', value: 15, color: 'text-agent-risks-low' }
            ],
            patientFriendly: "You have Type 2 Diabetes and high blood pressure. Your blood sugar is high, and we found early signs of eye changes. We recommend starting medication and making some lifestyle changes to protect your heart and eyes.",
            population: {
                cohortSize: 12500,
                percentile: 78,
                regionalTrend: 'Increasing (+12% YoY)',
                avgHba1c: 7.2
            },
            costs: {
                medication: 120,
                monitoring: 45,
                consultations: 250,
                total: 415,
                currency: 'USD'
            },
            trajectory: {
                metric: 'HbA1c (%)',
                data: [
                    { month: 'Current', value: 7.8 },
                    { month: '3m', value: 7.2 },
                    { month: '6m', value: 6.8 },
                    { month: '9m', value: 6.5 },
                    { month: '12m', value: 6.3 }
                ],
                baseline: 7.8,
                target: 6.5
            },
            trials: [
                {
                    id: 'NCT05512345',
                    title: 'Novel GLP-1 Receptor Agonist Study',
                    phase: 'Phase III',
                    match: 92,
                    eligibility: 'High',
                    description: 'Evaluating the efficacy of a once-monthly GLP-1 agonist in patients with T2D and hypertension.'
                },
                {
                    id: 'NCT05567890',
                    title: 'Digital Health Intervention for T2D',
                    phase: 'Phase II',
                    match: 85,
                    eligibility: 'High',
                    description: 'A randomized trial of a mobile-based coaching platform for glycemic control.'
                }
            ],
            liveBoard: [
                { agent: 'Endocrinology AI', comment: 'Trajectory looks optimistic; ensure renal function is monitored.', timestamp: '2s ago' },
                { agent: 'Cardiology AI', comment: 'BP management is critical here; consider SGLT2i for dual benefit.', timestamp: '5s ago' },
                { agent: 'Ophthalmology AI', comment: 'Retinopathy is mild; annual follow-up is sufficient for now.', timestamp: '10s ago' }
            ],
            ethics: {
                fairnessScore: 98,
                biasMitigation: [
                    { step: 'Demographic Parity Check', status: 'Passed' },
                    { step: 'Counterfactual Fairness Analysis', status: 'Passed' },
                    { step: 'PII Scrubbing Verification', status: 'Passed' }
                ],
                compliance: ['HIPAA', 'GDPR', 'SOC2']
            }
        }
    },
    {
        id: 'pneumonia',
        name: 'Bacterial Pneumonia',
        patientData: {
            demographics: { age: 42, gender: 'Female', id: 'PX-4412', region: 'Europe' },
            vitals: { bp: '118/75', hr: 92, temp: '102.1°F', o2: '91%' },
            labs: { wbc: '14.5 x10^9/L', crp: '85 mg/L', respiratory_rate: '24' },
            symptoms: ['Productive cough', 'Chest pain', 'Shortness of breath'],
            history: [
                { date: '2020-08-12', event: 'Asthma Diagnosis' },
                { date: '2023-05-05', event: 'Smoking cessation counseling' }
            ],
            imaging: {
                type: 'Chest X-Ray',
                findings: 'Right lower lobe consolidation consistent with pneumonia.',
                regions: [
                    { x: 180, y: 200, w: 100, h: 120, label: 'Consolidation', confidence: 0.95 }
                ]
            },
            genomics: {
                variants: [
                    { gene: 'CYP3A4', variant: '*1/*1', impact: 'Normal Metabolism', drug: 'Azithromycin', risk: 'Low' }
                ],
                summary: "Normal metabolic profile for recommended antibiotic therapy."
            }
        },
        results: {
            diagnosis: 'Community-Acquired Bacterial Pneumonia',
            confidence: 92,
            models: [
                { name: 'Med-PaLM 2', prediction: 'Bacterial Pneumonia', confidence: 94 },
                { name: 'GPT-4V', prediction: 'Pneumonia (likely bacterial)', confidence: 90 }
            ],
            reasoning: [
                { text: 'High fever (102.1°F) and elevated WBC count indicate acute infection', status: 'validated' },
                { text: 'Decreased O2 saturation (91%) suggests impaired gas exchange', status: 'validated' },
                { text: 'Chest X-Ray confirms right lower lobe consolidation, a hallmark of pneumonia.', status: 'validated' },
                { text: 'Elevated CRP (85 mg/L) confirms significant systemic inflammation', status: 'validated' }
            ],
            citations: [
                {
                    title: 'Diagnosis and Treatment of Community-Acquired Pneumonia',
                    source: 'ATS/IDSA Guidelines',
                    abstract: 'Clinical guidelines for the management of CAP in adults, emphasizing early antibiotic initiation and risk stratification.'
                }
            ],
            recommendations: [
                'Empiric antibiotic therapy (Azithromycin + Ceftriaxone)',
                'Supplemental oxygen as needed',
                'Chest X-ray follow-up in 48 hours',
                'Increased fluid intake and rest'
            ],
            risks: [
                { label: 'Respiratory Failure', value: 20, color: 'text-agent-risks-medium' },
                { label: 'Sepsis Risk', value: 15, color: 'text-agent-risks-low' },
                { label: 'Pleural Effusion', value: 10, color: 'text-agent-risks-low' }
            ],
            patientFriendly: "You have a bacterial lung infection called pneumonia. This is causing your fever and breathing difficulties. We will start you on antibiotics and oxygen to help you recover.",
            population: {
                cohortSize: 8400,
                percentile: 62,
                regionalTrend: 'Seasonal Peak',
                avgWbc: 11.2
            },
            costs: {
                medication: 85,
                oxygen: 150,
                imaging: 200,
                total: 435,
                currency: 'EUR'
            },
            trajectory: {
                metric: 'WBC Count (x10^9/L)',
                data: [
                    { month: 'Day 1', value: 14.5 },
                    { month: 'Day 3', value: 11.2 },
                    { month: 'Day 7', value: 8.5 },
                    { month: 'Day 14', value: 7.2 },
                    { month: 'Day 30', value: 6.8 }
                ],
                baseline: 14.5,
                target: 7.0
            },
            trials: [
                {
                    id: 'NCT05599887',
                    title: 'New Antibiotic for Resistant Pneumonia',
                    phase: 'Phase II',
                    match: 78,
                    eligibility: 'Medium',
                    description: 'Testing a novel cephalosporin for community-acquired pneumonia with suspected resistance.'
                }
            ],
            liveBoard: [
                { agent: 'Infectious Disease AI', comment: 'Antibiotic choice is appropriate for regional resistance patterns.', timestamp: '1s ago' },
                { agent: 'Pulmonology AI', comment: 'Monitor O2 saturation closely; consider prone positioning if it drops.', timestamp: '4s ago' }
            ],
            ethics: {
                fairnessScore: 99,
                biasMitigation: [
                    { step: 'Demographic Parity Check', status: 'Passed' },
                    { step: 'Counterfactual Fairness Analysis', status: 'Passed' }
                ],
                compliance: ['GDPR', 'HIPAA']
            }
        }
    }
];

export const AGENTS = [
    {
        id: 'parser',
        name: 'Medical Document Parser',
        icon: 'FileText',
        color: 'text-agent-parser',
        bgColor: 'bg-agent-parser',
        description: 'Extracts structured data from MRI, lab reports, and patient history.',
        logs: [
            { message: 'Initializing DICOM parser...', data: { engine: 'DICOM-v3', status: 'ready' } },
            { message: 'Extracting metadata from PDF reports...', data: { fields: 24 } },
            { message: 'Structuring patient history data...', data: { timeline_events: 3 } }
        ]
    },
    {
        id: 'privacy',
        name: 'Privacy Protection Agent',
        icon: 'Shield',
        color: 'text-agent-privacy',
        bgColor: 'bg-agent-privacy',
        description: 'Ensures HIPAA compliance and data anonymization.',
        logs: [
            { message: 'Scanning for PII...', data: { pii_found: ['Name', 'DOB'], risk_level: 'High' } },
            { message: 'Hashing patient identifiers...', data: { algorithm: 'SHA-256' } },
            { message: 'Applying differential privacy masks...', data: { epsilon: 0.1 } }
        ]
    },
    {
        id: 'prep',
        name: 'Data Preparation Agent',
        icon: 'Database',
        color: 'text-agent-prep',
        bgColor: 'bg-agent-prep',
        description: 'Normalizes and standardizes medical terminology.',
        logs: [
            { message: 'Mapping to SNOMED CT...', data: { codes: ['44054006'] } },
            { message: 'Converting units to standard SI...', data: { conversions: ['mg/dL -> mmol/L'] } }
        ]
    },
    {
        id: 'vision',
        name: 'Medical Vision Agent',
        icon: 'Eye',
        color: 'text-agent-vision',
        bgColor: 'bg-agent-vision',
        description: 'Analyzes medical imaging (MRI, X-Ray, CT) for anomalies.',
        logs: [
            { message: 'Loading DICOM image series...', data: { slices: 124, modality: 'CT' } },
            { message: 'Running segmentation models...', data: { targets: ['Lungs', 'Heart'] } },
            { message: 'Detecting pathological features...', data: { anomalies_found: 1, confidence: 0.96 } }
        ]
    },
    {
        id: 'rag',
        name: 'Medical Knowledge RAG',
        icon: 'Brain',
        color: 'text-agent-rag',
        bgColor: 'bg-agent-rag',
        description: 'Retrieves relevant medical literature and clinical guidelines.',
        logs: [
            { message: 'Querying PubMed vector database...', data: { top_k: 5 } },
            { message: 'Retrieving clinical guidelines...', data: { sources: ['ADA', 'ATS'] } }
        ]
    },
    {
        id: 'prediction',
        name: 'Diagnostic Prediction Agent',
        icon: 'Stethoscope',
        color: 'text-agent-prediction',
        bgColor: 'bg-agent-prediction',
        description: 'Multi-modal analysis for diagnostic predictions.',
        logs: [
            { message: 'Integrating imaging and lab data...', data: { modalities: ['Vision', 'Text'] } },
            { message: 'Running Med-PaLM 2 analysis...', data: { model: 'med-palm-2' } }
        ]
    },
    {
        id: 'peer',
        name: 'Peer Review Agent',
        icon: 'CheckSquare',
        color: 'text-agent-peer',
        bgColor: 'bg-agent-peer',
        description: 'Second-opinion AI for error and bias detection.',
        logs: [
            { message: 'Cross-referencing prediction with vision findings...', data: { consistency: 0.92 } },
            { message: 'Checking for demographic bias...', data: { bias_score: 0.02 } },
            { message: 'Flagging reasoning discrepancies...', data: { flags: 1 } }
        ]
    },
    {
        id: 'explainability',
        name: 'Explainability Agent',
        icon: 'Lightbulb',
        color: 'text-agent-explainability',
        bgColor: 'bg-agent-explainability',
        description: 'Generates human-readable reasoning and citations.',
        logs: [
            { message: 'Analyzing feature importance...', data: { shap_values: { vision: 0.4, labs: 0.35 } } },
            { message: 'Generating reasoning chains...', data: { steps: 4 } }
        ]
    },
    {
        id: 'advocate',
        name: 'Patient Advocate Agent',
        icon: 'Heart',
        color: 'text-agent-advocate',
        bgColor: 'bg-agent-advocate',
        description: 'Translates clinical data into patient-friendly insights.',
        logs: [
            { message: 'Simplifying medical terminology...', data: { grade_level: '8th' } },
            { message: 'Calculating long-term risk scores...', data: { risk_horizon: '5-years' } }
        ]
    },
    {
        id: 'epidemiology',
        name: 'Epidemiological Agent',
        icon: 'Globe',
        color: 'text-agent-epidemiology',
        bgColor: 'bg-agent-epidemiology',
        description: 'Contextualizes cases within global health trends.',
        logs: [
            { message: 'Fetching regional health statistics...', data: { region: 'North America' } },
            { message: 'Comparing case to population cohort...', data: { cohort_size: 12500 } },
            { message: 'Analyzing regional cost trends...', data: { trend: 'Increasing' } }
        ]
    },
    {
        id: 'longitudinal',
        name: 'Longitudinal Tracking Agent',
        icon: 'TrendingUp',
        color: 'text-agent-longitudinal',
        bgColor: 'bg-agent-longitudinal',
        description: 'Predicts health trajectory over 12 months.',
        logs: [
            { message: 'Analyzing historical adherence patterns...', data: { adherence_score: 0.85 } },
            { message: 'Simulating 12-month treatment outcome...', data: { confidence: 0.88 } }
        ]
    },
    {
        id: 'trials',
        name: 'Clinical Trial Matcher',
        icon: 'Search',
        color: 'text-agent-trials',
        bgColor: 'bg-agent-trials',
        description: 'Matches patient with active clinical trials.',
        logs: [
            { message: 'Scanning ClinicalTrials.gov database...', data: { trials_scanned: 1250 } },
            { message: 'Filtering by eligibility criteria...', data: { matches_found: 2 } }
        ]
    },
    {
        id: 'ethics',
        name: 'Ethics & Compliance Agent',
        icon: 'Scale',
        color: 'text-agent-ethics',
        bgColor: 'bg-agent-ethics',
        description: 'Monitors for bias and regulatory compliance.',
        logs: [
            { message: 'Running fairness audit...', data: { fairness_score: 0.98 } },
            { message: 'Verifying HIPAA/GDPR compliance...', data: { status: 'compliant' } }
        ]
    },
    {
        id: 'genomics',
        name: 'Pharmacogenomics Agent',
        icon: 'Dna',
        color: 'text-agent-genomics',
        bgColor: 'bg-agent-genomics',
        description: 'Predicts drug response based on genetic data.',
        logs: [
            { message: 'Analyzing genomic variants...', data: { variants_found: 2 } },
            { message: 'Predicting drug-gene interactions...', data: { high_risk_interactions: 1 } }
        ]
    }
];
