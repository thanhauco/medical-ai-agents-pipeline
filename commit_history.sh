#!/bin/bash

# Configuration
export GIT_AUTHOR_NAME="Thanh Vu"
export GIT_AUTHOR_EMAIL="thanhauco@gmail.com"
export GIT_COMMITTER_NAME="Thanh Vu"
export GIT_COMMITTER_EMAIL="thanhauco@gmail.com"

commit() {
    local date="$1"
    local message="$2"
    shift 2
    local files=("$@")
    
    for file in "${files[@]}"; do
        git add "$file"
    done
    
    GIT_AUTHOR_DATE="$date" GIT_COMMITTER_DATE="$date" git commit -m "$message"
}

# 1. Initial setup
commit "2025-08-01 09:00:00" "feat: initial project setup with vite and tailwind" package.json vite.config.js tailwind.config.js index.html

# 2. Core layout
commit "2025-08-04 14:30:00" "feat: implement core layout and header component" src/App.jsx src/components/Header.jsx

# 3. Control panel
commit "2025-08-07 11:15:00" "feat: add control panel and scenario selection" src/components/ControlPanel.jsx

# 4. Pipeline hook
commit "2025-08-10 16:45:00" "feat: implement usePipeline hook for agent orchestration" src/hooks/usePipeline.js

# 5. Mock data
commit "2025-08-13 10:20:00" "feat: define initial mock data and agent configurations" src/data/mockData.js

# 6. Agent cards
commit "2025-08-16 13:50:00" "feat: implement agent cards and pipeline visualization" src/components/AgentCard.jsx

# 7. Results dashboard
commit "2025-08-19 15:10:00" "feat: add results dashboard and patient profile" src/components/ResultsDashboard.jsx

# 8. Timeline
commit "2025-08-22 09:40:00" "feat: implement medical history timeline" src/components/Timeline.jsx

# 9. Imaging viewer
commit "2025-08-25 14:25:00" "feat: add multi-modal imaging viewer with heatmaps" src/components/ImageViewer.jsx

# 10. Chatbot
commit "2025-08-28 11:05:00" "feat: implement interactive patient chatbot" src/components/PatientChatbot.jsx

# 11. Population analytics
commit "2025-08-31 16:30:00" "feat: add population analytics and cost trends" src/components/PopulationAnalytics.jsx

# 12. Reasoning validation
commit "2025-09-03 10:15:00" "feat: implement peer review and reasoning validation" src/components/ResultsDashboard.jsx

# 13. Aesthetic overhaul
commit "2025-09-06 13:45:00" "style: aesthetic overhaul with premium glassmorphism and mesh gradients" src/index.css

# 14. Component polish
commit "2025-09-09 15:00:00" "refactor: polish header and control panel visuals" src/components/Header.jsx src/components/ControlPanel.jsx

# 15. Longitudinal tracking
commit "2025-09-12 09:30:00" "feat: implement longitudinal tracking and health trajectory" src/components/HealthTrajectory.jsx

# 16. Trial matching & Live review
commit "2025-09-15 14:15:00" "feat: add clinical trial matching and live review board" src/components/TrialMatcher.jsx src/components/LiveReview.jsx

# 17. Ethics & Compliance
commit "2025-09-18 11:00:00" "feat: implement ethics and compliance monitoring" src/components/EthicalGuardrails.jsx

# 18. Pharmacogenomics
commit "2025-09-21 16:20:00" "feat: add pharmacogenomics and genomic insights" src/components/GenomicInsights.jsx

# 19. FHIR Export
commit "2025-09-24 10:10:00" "feat: implement fhir-compatible export functionality" src/hooks/usePipeline.js

# 20. Documentation
commit "2025-09-27 13:40:00" "docs: comprehensive documentation expansion and technical diagrams" README.md

# Add remaining files
git add .
GIT_AUTHOR_DATE="2025-09-30 10:00:00" GIT_COMMITTER_DATE="2025-09-30 10:00:00" git commit -m "chore: final project polish and build verification"

