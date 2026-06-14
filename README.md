# final-semester-project-
https://final-semester-project-bay.vercel.app
# 🩺 Doctor-Hub: A Multi-Role Healthcare Management System

**Doctor-Hub** is a responsive, feature-rich, full-stack web application designed to streamline healthcare accessibility and medical management. The platform bridges the communication and operational gap between Patients, Doctors, and Medical Assistants by providing a secure, role-based ecosystem.

This repository is structured as a **Monorepo**, containing both the backend REST API and the frontend Next.js application, seamlessly deployed together.

---

## 🔗 Live Deployment Links
* **Live Web Application (Frontend):** [https://final-semester-project.vercel.app](https://final-semester-project.vercel.app)
* **Live API Endpoint (Backend):** [https://doctor-hub-backend-hadiaiqbal1807s-projects.vercel.app/api](https://doctor-hub-backend-hadiaiqbal1807s-projects.vercel.app/api)

---

## 🌟 Comprehensive Architecture & Workflows

### 1. Dynamic Conditional Onboarding Flow
The platform customizes the registration interface based on user types dynamically using client-side react states:
* **Patient Module:** Registers with standard credentials. Gains immediate access to search and view the verified directory of practicing doctors.
* **Doctor Module:** Triggers conditional form expansion. Requires input of critical medical career fields:
  * **Specialization:** Field of expertise (e.g., Cardiology, Dermatology).
  * **Treatment Domain:** Classification of medical methodology (`Allopathic`, `Homeopathic`, or `Herbal`).
  * **Consultation Fees:** Flat rate pricing handled in PKR currency for transparency.
* **Assistant Module:** Created to provide mid-level access control for clinical operations, calendar handling, and patient triage.

### 2. Full-Stack Security & State Persistence
* **Asynchronous API Client:** Communication is streamlined via a central **Axios** instance located in the utilities folder.
* **Automated Session Interceptors:** Rather than attaching tokens manually to every request, a client-side interceptor reads the `localStorage` and injects the JSON Web Token (`Bearer <token>`) into the HTTP authorization headers automatically for protected routes.
* **Database Cryptography:** Cleartext passwords are securely intercepted and hashed using a salt factor generated via `bcryptjs` before being written into MongoDB Atlas cluster collections.

---

## 🛠️ Complete Technical Stack

| System Layer | Technology / Dependency | Engineering Purpose |
| :--- | :--- | :--- |
| **Frontend UI** | **Next.js 15+ / React 19** | App Router architecture, optimized client routing, and state-driven components. |
| **Styling Layout** | **Tailwind CSS** | Native utility-first layouts ensuring fluid responsive breakdowns for mobile and web views. |
| **Backend Runtime** | **Node.js** | Server-side execution engine handling the application runtime environment. |
| **API Architecture** | **Express.js** | Modular HTTP middleware routing, route partitioning, and controllers. |
| **Database Cluster** | **MongoDB Atlas** | Highly flexible document-oriented storage for fast read/write query operations. |
| **Data ODM Model** | **Mongoose** | Mapping object schemas, enforcing field validations, and typing data models. |
| **Hosting Cloud** | **Vercel Platform** | Advanced production Monorepo scaling, handling automatic edge network API deployments. |

---

## 📂 Comprehensive Directory Breakdown

```text
Doctor-Hub/
├── frontend/               # Next.js Frontend Application Folder
│   ├── app/                # Next.js App Router Structure
│   │   ├── login/          # Login View Client Component & Router Logic
│   │   │   └── page.js     # User Session Validation Form
│   │   ├── register/       # Conditional Role-Based Registration Interface
│   │   │   └── page.js     # Signup Form for Patients & Doctors
│   │   ├── layout.js       # Global Shell, Metatags, and Font Styling
│   │   └── page.js         # Interactive Dynamic Welcome Landing Page
│   ├── utils/              # Client-Side Communication Configurations
│   │   └── api.js          # Central Axios Instance with JWT Interceptors
│   ├── package.json        # Frontend Project Manifest & Next Dependencies
│   └── tailwind.config.ts  # Tailwind CSS Custom Theme & Variant Configurations
├── models/                 # Database Document Specifications (Mongoose)
│   ├── User.js             # Unified User Auth Schema (Name, Email, Password, Role)
│   └── Appointment.js      # Structured Reservation Schema
├── routes/                 # Endpoint Middleware Handling Routing
│   └── auth.js             # Authorization Routes (Signup, Signin)
├── middleware/             # Server-Side Guards
│   └── authMiddleware.js   # Custom JWT Verification Route Protection
├── server.js               # Primary Node.js Backend Server File
├── vercel.json             # Monorepo Deployment Map & Gateway Rewrite Configurations
└── package.json            # Backend Project Manifest & Library Version Control
