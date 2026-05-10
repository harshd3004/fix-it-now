# FixItNow

FixItNow is a web-based Home Services Marketplace Platform that connects customers with skilled technicians such as plumbers, electricians, and carpenters through a structured bidding system.

The platform enables transparent job posting, competitive bidding, technician selection, and performance-based evaluation.

<img src="https://github.com/user-attachments/assets/ef0c8afd-a0d7-4fb4-a9ca-cb9ea451b0dc" alt="FixItNow Home Screen" width="100%">
---

## 🖼️ Preview
<details>
    <summary>Click to expand screenshots of FixItNow</summary>
    <br>
    <table>
        <tr>
            <td><img width="400" alt="Technician Dashboard" src="https://github.com/user-attachments/assets/0e539ca8-28ad-412d-bf2f-d3f68b5c124e" /></td>
            <td><img width="400" alt="Customer Home" src="https://github.com/user-attachments/assets/495dc6f1-3164-469a-bfb0-719e788c1cd1" /></td>
        </tr>
        <tr>
            <td><img width="400" alt="Post Job" src="https://github.com/user-attachments/assets/ebe2463c-0529-4f86-b69b-16399cc7687c" /></td>
            <td><img width="400" alt="Bid Placing" src="https://github.com/user-attachments/assets/0b4791dd-4578-4c8e-9788-cfebe8cc2562" /></td>
        </tr>
        <tr>
            <td><img width="400" alt="Updating Status" src="https://github.com/user-attachments/assets/01733fc1-40fc-42ff-9db1-6484b718228f" /></td>
            <td><img width="400" alt="Bid View" src="https://github.com/user-attachments/assets/cd353923-af65-457f-9d7e-3083038e393a" /></td>
        </tr>
    </table>
</details>

---

## 🚀 Features

### 👤 Customer
- Register and login
- Post service requests with images and details
- View and compare technician bids
- Select technician and manage assigned jobs
- Request job reschedule (when job is assigned)
- Approve or reject reschedule requests from technicians
- Track job status (Open → Assigned → In Progress → Completed)
- Rate and review completed jobs
- View notifications for bid and reschedule updates

### 🛠 Technician
- Register and manage profile with skills and expertise
- Browse open jobs with filtering
- Submit bids with competitive pricing and estimated time
- Update job status progression
- Request reschedule for assigned jobs with reason
- View ratings and performance metrics
- Track bid history and accepted jobs
- Receive notifications for bid acceptance and status updates

### 🛡 Admin
- Manage users and technicians
- Approve or suspend accounts
- Monitor jobs and system activity
- View platform analytics

---

## 🧠 Core System Highlights

- **Role-Based Access Control** (Customer / Technician / Admin)
- **Intelligent Technician Ranking** based on ratings and reviews
- **Bidding-Based Job Allocation** with transparent pricing
- **Structured Job Lifecycle Management** (Open → Assigned → In Progress → Completed)
- **Rating & Reliability System** for technician credibility
- **Reschedule Request System** with customer approval workflow
- **Notification System** for real-time updates
- **JWT Authentication** with secure token management

---

## 🏗 Tech Stack

**Frontend**
- React 18 with Vite
- React Router v6
- Tailwind CSS
- Axios HTTP client
- Context API for state management

**Backend**
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT Authentication (jsonwebtoken)
- bcrypt for password hashing
- Multer for file uploads

**Database**
- MongoDB

---

## 📂 Project Structure

```
fix-it-now/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controller/
│   │   ├── auth.controller.js    # Authentication logic
│   │   ├── job.controller.js     # Job management
│   │   ├── bid.controller.js     # Bidding system
│   │   ├── user.controller.js    # User management
│   │   ├── category.controller.js
│   │   ├── notification.controller.js
│   │   └── reschedule.controller.js # Reschedule requests
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification
│   │   ├── errorMiddleware.js    # Error handling
│   │   └── upload.js             # File upload config
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Job.js                # Job schema
│   │   ├── Bid.js                # Bid schema
│   │   ├── Category.js
│   │   ├── Notification.js
│   │   ├── Review.js
│   │   ├── StatusRequest.js
│   │   └── RescheduleRequest.js  # Reschedule request schema
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── job.routes.js
│   │   ├── bid.routes.js
│   │   ├── user.routes.js
│   │   ├── category.routes.js
│   │   ├── notification.routes.js
│   │   ├── status-requests.routes.js
│   │   └── reschedule.routes.js
│   ├── uploads/                  # Uploaded job images
│   ├── env-example.txt
│   ├── package.json
│   └── server.js                 # Express app entry point
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   ├── apiClient.js      # Axios instance
    │   │   ├── authApi.js
    │   │   ├── jobsApi.js        # Job & reschedule endpoints
    │   │   ├── bidApi.js
    │   │   ├── userApi.js
    │   │   ├── categoryApi.js
    │   │   └── notificationsApi.js
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── JobDetails.jsx    # Job display with date fix
    │   │   ├── JobList.jsx
    │   │   ├── BidForm.jsx
    │   │   ├── BidList.jsx
    │   │   ├── UpdateDialog.jsx  # Status update
    │   │   ├── UpdateRequestDialog.jsx
    │   │   ├── RescheduleRequestDialog.jsx # New reschedule form
    │   │   ├── NotificationDropdown.jsx
    │   │   └── SkillDropdown.jsx
    │   ├── contexts/
    │   │   └── AuthContext.jsx   # Global auth state
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── TechnicianRegister.jsx
    │   │   ├── JobListingPage.jsx
    │   │   ├── JobDetailsPage.jsx # Shows reschedule requests
    │   │   ├── PostJob.jsx
    │   │   ├── ProfilePage.jsx
    │   │   └── TechnicianDashboard.jsx
    │   ├── layouts/
    │   │   └── MainLayout.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── public/
    ├── package.json
    ├── vite.config.js
    ├── eslint.config.js
    └── index.html

```

---

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas connection)
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd fix-it-now
```

### Step 2: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp env-example.txt .env

# Update .env with your configuration
# Edit .env and add:
# - MONGODB_URI=your_mongodb_connection_string
# - JWT_SECRET=your_jwt_secret_key
# - PORT=3000

# Start backend server
npm run dev
```

### Step 3: Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Start frontend development server
npm run dev
```

The frontend will be available at `http://localhost:5173` and backend at `http://localhost:3000`

---

## 🌍 Environment Configuration

### Backend (.env)

```
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/fixitnow
# OR for MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fixitnow

# Server Port
PORT=3000

# JWT Secret (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_change_this

# Node Environment
NODE_ENV=development
```

### Frontend (.env.local or .env)

```
# API Base URL
VITE_API_BASE_URL=http://localhost:3000

# Optional: Base URL for image serving
VITE_BASE_URL=http://localhost:3000
```

---

## 🚀 How to Run

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Access the app at: http://localhost:5173

### Production Mode

**Backend:**
```bash
cd backend
npm run build  # if applicable
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview  # or deploy dist/ folder
```

---

## 📡 Key API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/register-technician` - Technician registration

### Jobs
- `GET /api/jobs` - Fetch all jobs (with filters)
- `GET /api/jobs/:jobId` - Get job details
- `POST /api/jobs` - Post new job (customer only)
- `POST /api/jobs/:jobId/update-status` - Update job status

### Bids
- `POST /api/bids` - Submit a bid
- `GET /api/bids/:jobId` - Get bids for a job
- `POST /api/bids/:bidId/accept` - Accept a bid

### Reschedule Requests
- `POST /api/reschedule/:jobId/request` - Technician requests reschedule
- `GET /api/reschedule/:jobId` - Get reschedule requests for job (customers see pending only)
- `POST /api/reschedule/:id/approve` - Customer approves reschedule
- `POST /api/reschedule/:id/reject` - Customer rejects reschedule

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/technicians` - List all technicians

### Notifications
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id/read` - Mark notification as read

### Categories
- `GET /api/categories` - Get all service categories

---

## 🔄 Job Workflow

1. **Customer posts a job** with title, description, category, preferred date, and images
2. **Technicians browse** and submit competitive bids with pricing and estimated time
3. **Customer selects** a bid and assigns technician
4. **Job status progresses**: Open → Assigned → In Progress → Completed
5. **Technician can request reschedule** if assigned (customer approves/rejects)
   - If approved: job date updates, both parties notified
   - If rejected: technician unassigned, job reopened for new bids
6. **Customer submits rating** and feedback after completion
7. **Technician reputation** updates based on ratings

---

## 📋 Reschedule Request System

**Technician Flow:**
- When job is in "Assigned" state, technician sees "Request Reschedule" button
- Submits proposed date and optional reason
- Only one pending request per job allowed
- Receives notification on approval/rejection

**Customer Flow:**
- Sees only pending reschedule requests for their jobs
- Can approve (updates job date) or reject (unassigns technician, reopens job)
- Both actions notify the technician

---

## 🎯 Project Objective

To design and develop a secure, scalable, and transparent web-based home services marketplace that improves trust, efficiency, and accessibility in local service hiring.

---

## 📌 Future Improvements

- Real-time chat between customer and technician
- Online payment integration
- Geo-based technician matching
- Mobile application support (React Native)
- Advanced analytics dashboard for admin
- Email notifications
- Two-factor authentication
- Technician availability calendar

---

## 🐛 Troubleshooting

**Backend won't start:**
- Ensure MongoDB is running
- Check `.env` file has correct `MONGODB_URI`
- Verify port 3000 is not in use

**Frontend can't connect to backend:**
- Ensure backend is running on port 3000
- Check `VITE_API_BASE_URL` in frontend `.env`
- Verify CORS is enabled in backend

---

## 📄 License

This project is developed for academic purposes.
