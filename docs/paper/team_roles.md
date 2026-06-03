# 👥 Team Contribution Breakdown — CryptoGuard

Here is the contribution breakdown for your 5-member group and your guide based on the actual components of the project:

---

### Member 1 — Aaryan Shelar (Frontend Lead - UI/UX & Pages)
* **Role:** Designed and built the React frontend user interface.
* **Key Files Worked On:**
  * `newFrontend/src/app/pages/LoginPage.tsx`
  * `newFrontend/src/app/pages/RegisterPage.tsx`
  * `newFrontend/src/app/pages/DashboardPage.tsx`
  * `newFrontend/src/app/pages/AnalysisResultPage.tsx`
* **Key Contribution:** Implemented the modern dashboard UI, result visualization panels, taint flow graph rendering, and user authentication flow.

---

### Member 2 — Sarthak Bhat (Backend Lead - Express API & Jobs)
* **Role:** Built the backend HTTP endpoints, database schema, and task worker.
* **Key Files Worked On:**
  * `backend/api/` (API routes and controller handlers)
  * `backend/db/schema.sql` (PostgreSQL schemas)
  * `backend/queue/` & `backend/jobs/` (Redis-based background job queues)
* **Key Contribution:** Created the secure backend endpoints, structured the database models to store repositories/findings, and set up Redis queues to handle long-running static analysis jobs asynchronously.

---

### Member 3 — Sarvesh Alegaonkar (Core Analyzer Lead - AST Parsing & Taint Tracking)
* **Role:** Developed the Java core static analysis CLI.
* **Key Files Worked On:**
  * `analyzer/src/main/java/` (AST Parser, Taint Tracker, and QRS calculator)
  * `analyzer/pom.xml` (Maven build configuration)
* **Key Contribution:** Built the Abstract Syntax Tree (AST) parsing engine using Eclipse JDT, developed the interprocedural backward slice taint tracking logic, and programmed the detection signatures for cryptographic APIs.

---

### Member 4 — Ramjan Shaikh (DevOps & Scripting Lead)
* **Role:** Managed deployment, integration, cleanups, git orchestration, and automation.
* **Key Files Worked On:**
  * `docker/` (Dockerfile and docker-compose configurations)
  * `.gitignore` & Repository cleanup actions
  * Integration scripts and shell configurations
* **Key Contribution:** Sandboxed the analyzer running environment, structured docker containers, cleaned the project repository (removing node_modules and logs before push), and automated compilation pipelines.

---

### Member 5 — Jagruti Sarode (QA, Testing & Risk Formulation)
* **Role:** Formulated the risk calculation models and conducted experimental evaluations.
* **Key Files Worked On:**
  * `analyzer/src/main/java/risk/QRSCalculator.java` (QRS calculation logic)
  * `evaluation/evaluate.py` (Evaluation harness against lexical baselines)
* **Key Contribution:** Defined the Quantum Risk Score (QRS) mathematical formula, set up test sandboxes to evaluate recall/precision improvements, and compiled experimental statistics comparing the platform with traditional regex tools.

---

### Project Guide — Prof. Ashlesha Sawant
* **Role:** Academic supervision, methodology validation, and paper review.
* **Key Contribution:** Guided the team on the research methodology, validated the Quantum Risk Score (QRS) framework, and oversaw the structuring of the final academic paper and literature review.
