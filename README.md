# 📓 Full-Stack Monorepo Notebook Application

A high-performance, completely decoupled 3-tier system architecture engineered to establish deep backend core fundamentals, robust environment orchestration, and safe data persistence.

## 📐 System Architecture Topology

```
[React Client SPA] ──► (Deployed to Render Static Site CDN / Rewrites Active)
│
▼ (REST API / Asynchronous JSON Payloads over HTTP / CORS Secured)
[Express API Engine] ──► (Deployed to Render Web Service / Optimized Production Context)
│
▼ (Mongoose Connection Pool / Dynamic Fallback Handshake)
[MongoDB Atlas Cluster] ──► (Cloud Hosted Data Layer / Globally Whitelisted Firewall)
```

## 🛠️ Production Engineering & Core Wins

* **Modular Database Orchestration:** Decoupled data connections out of the main execution file into `backend/config/db.js`. Engineered adaptive routing properties (`process.env.MONGODB_URI`) that automatically balance between local offline sandboxes and live cloud clusters seamlessly.
* **Defensive Frontend Lifecycle Guards:** Squashed UI component race conditions on deep-linked page reloads. Handled initial async network delays safely by integrating optional chaining (`?.`) and precise input field state synchronization blocks (`useEffect`) to ensure zero-downtime rendering.
* **Isolated Monorepo Build Targets:** Configured specialized `Root Directory` execution targets for both `backend/` and `frontend/` services, allowing an optimized build pipeline from a single unified Git repository tree.
* **Strict Production Security:** Activated `NODE_ENV=production` settings globally to unlock internal Express caching optimizations and seal verbose server diagnostic stack traces from public visibility.
* **SPA Deep-Linking Resiliency:** Provisioned clean fallback URL path interceptor rules (`Source: /*` to `/index.html`) on the distribution network layer to guarantee client-side route tracking survives hard browser reloads.

## 🚀 Execution & Configuration Protocols

### Local Development Setup
To configure the environment locally, provision a `.env` file within the `backend/` directory root:

```env
MONGODB_URI=mongodb+srv://<dbUser>:<password>@cluster0.xxxx.mongodb.net/notebook?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

### Script Execution Triggers

1. **Fire Up the Backend API Engine:**
   ```bash
   cd backend
   npm install
   npm start # Node runtime engine configuration
   ```

2. **Fire Up the Frontend UI Client:**
   ```bash
   cd frontend
   npm install
   npm run dev # Vite development environment
   ```

## 🌐 Production Cloud Infrastructure Deployment Details

* **Database Cluster Management:** Scaled on MongoDB Atlas with global traffic parameters set (`0.0.0.0/0`) to allow dynamic host targeting.
* **API Service Cluster:** Monitored Node Web Service hosted on Render, pointing strictly to the `backend/` subfolder container.
* **User Interface Distribution:** Static SPA bundle distributed globally via Render CDN, operating with relative environment endpoint routing via dynamic host verification protocols.


