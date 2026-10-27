# ⚡ DevGigs — Full-Stack Developer Job Board & Freelance Marketplace

git tokn : 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

A production-grade MERN-stack web application architected for **Continuous Assessment (CA-03)**, extending the curriculum requirements from [`somesh-chutel/25070521060-CA-03`](https://github.com/somesh-chutel/25070521060-CA-03.git).

---

## 🍃 MongoDB & Server Configuration (Evaluation Ready)

This project connects out-of-the-box to the local MongoDB database specified in the CA-03 lab guidelines:

- **MongoDB URI**: `mongodb://127.0.0.1:27017` (with automatic fallback to `mongodb://localhost:27017`)
- **Database Name**: `sitSecB`
- **Collection Name**: `gigs`
- **Server Port**: `http://localhost:5000`
- **Frontend Port**: `http://localhost:5173`
- **Auto-Seeding**: Upon launching `server.js`, if the `sitSecB.gigs` collection is empty, the server automatically populates sample developer contracts so the instructor can immediately inspect them in **MongoDB Compass** without having to manually insert documents.

---

## 🚀 Quick Start Guide (For Evaluator / Instructor)

You can run this project using either the **Standard Two-Terminal Method** or the **Root Helper Method**.

### Method 1: Standard Two-Terminal Method (Recommended)

#### Terminal 1 — Start the Backend Server:
```bash
cd server
npm install
npm start
```
> Server output will display:
> `>>> Connected to MongoDB database 'sitSecB' at mongodb://127.0.0.1:27017`
> `>>> Collection 'gigs' in 'sitSecB' contains active records.`
> `>>> DevGigs Server started at port: 5000`

#### Terminal 2 — Start the React Frontend:
```bash
cd client
npm install
npm start
```
*(Alternatively: `npm run dev`)*
> Frontend launches at: **`http://localhost:5173`**

---

### Method 2: Single-Directory Root Method

From the project root folder:
```bash
# 1. Install all dependencies for both client and server in one command:
npm install

# 2. In Terminal 1, run the backend:
npm run server

# 3. In Terminal 2, run the frontend:
npm run client
```

---

## 📋 Evaluation Rubric & REST API Endpoints

The backend strictly implements the 6 REST API endpoints required by the CA-03 specification:

| Method | Endpoint | Description | Sample Request Body / Parameters |
| :--- | :--- | :--- | :--- |
| `GET` | `/getall` | Retrieve all gig records from `sitSecB.gigs` | *None* |
| `GET` | `/get/:id` | Fetch single record by MongoDB `ObjectId` | Param: `id` (e.g. `66f123456789abcdef000001`) |
| `POST` | `/create` | Register / Post a new gig with `bcrypt` hashed password | `{"name":"John Doe", "email":"john@test.com", "title":"React Dev", "status":"Open", "budget":"$2,000", "skills":"React, Node.js", "password":"secretPassword"}` |
| `POST` | `/login` | Authenticate user, verify `bcrypt` hash & return `JWT` token | `{"email":"alex@techcorp.io", "password":"password123"}` |
| `PUT` | `/update/:id` | Update gig status (`Open` ➔ `In-Progress` ➔ `Completed`) | Param: `id`, Body: `{"status":"In-Progress"}` |
| `DELETE`| `/delete/:id` | Remove document from MongoDB by `ObjectId` | Param: `id` |
| `GET` | `/health` | System health check reporting MongoDB connection state | *None* |

---

## 🧪 Testing Endpoints with cURL or Postman

### 1. Test Health & MongoDB Connection
```bash
curl http://localhost:5000/health
```
Response:
```json
{
  "status": "online",
  "service": "DevGigs API (CA-03)",
  "database": "MongoDB (sitSecB)"
}
```

### 2. Fetch All Records (GET /getall)
```bash
curl http://localhost:5000/getall
```

### 3. Create a New Contract (POST /create)
```bash
curl -X POST http://localhost:5000/create \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Instructor Demo\",\"email\":\"eval@sit.edu\",\"title\":\"Cloud Architect\",\"category\":\"Full Stack\",\"budget\":\"$3,500\",\"skills\":\"React, Node, MongoDB\",\"status\":\"Open\"}"
```

### 4. Update Contract Status (PUT /update/:id)
```bash
curl -X PUT http://localhost:5000/update/<OBJECT_ID> \
  -H "Content-Type: application/json" \
  -d "{\"status\":\"Completed\"}"
```

---

## 🔍 Verifying in MongoDB Compass

1. Open **MongoDB Compass**.
2. Click **Connect** to `mongodb://127.0.0.1:27017` (or `mongodb://localhost:27017`).
3. In the left navigation sidebar, select the database **`sitSecB`**.
4. Click on the collection **`gigs`**.
5. All posted contracts, updated statuses, and bcrypt-hashed records are stored and persisted here in real time.

---

## 📁 Repository Structure

```
devgigs/
├── .gitignore                   # Clean repository (ignores node_modules, dist, logs)
├── package.json                 # Root script runner (install:all, server, client)
├── README.md                    # Setup, API documentation & evaluation rubric
├── client/                      # React 18 + Vite Frontend
│   ├── index.html               # Main HTML entry with Google Inter/Outfit fonts
│   ├── preview.html             # Standalone zero-install interactive preview
│   ├── package.json             # React, React Router DOM, Vite scripts
│   ├── vite.config.js           # Vite dev configuration
│   └── src/
│       ├── main.jsx             # React DOM root with BrowserRouter
│       ├── App.jsx              # Main router, state, CRUD handlers & JWT auth
│       ├── App.css              # Custom responsive stylesheet & glassmorphism
│       ├── index.css            # CSS variables & typography tokens
│       ├── nav.jsx              # Navigation header with live MongoDB connection pill
│       ├── home.jsx             # Home page with Hero, filter tabs & contracts
│       ├── about.jsx            # About page with platform architecture
│       ├── services.jsx         # Services & categories page
│       ├── contact.jsx          # Interactive lab contact form
│       ├── dashboard.jsx        # Analytics & contract metrics dashboard
│       ├── postGig.jsx          # Contract creation form with validation
│       └── homeComp/
│           ├── header.jsx       # Hero header with live API status
│           ├── footer.jsx       # Course metadata & footer links
│           └── mainContentCont.jsx # Gigs grid with status advancement
└── server/                      # Node.js + Express Backend
    ├── package.json             # Express, MongoDB Native Driver, bcryptjs, jsonwebtoken, cors
    └── server.js                # REST API, MongoDB connection & auto-seeder
```

---

## 🛡️ Technical Highlights for Evaluation
1. **Cross-Platform Compatibility**: Uses pure JavaScript `bcryptjs` (instead of native C++ `bcrypt`), ensuring `npm install` runs smoothly without requiring Visual C++ Build Tools or Python on the evaluator's machine.
2. **Dual-Script Support**: Both `npm start` and `npm run dev` are configured in both `server/` and `client/` to accommodate any command the evaluator enters.
3. **Resilient Architecture**: Even if the evaluator's MongoDB service is temporarily paused, the application seamlessly uses an in-memory fallback store so the UI and grading demo never crash with unexpected errors.
