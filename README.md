# Three-Tier Web Application with Docker Compose

A production-ready three-tier web application demonstrating containerization with **Docker Compose**, featuring a **React frontend**, **Node.js/Express backend**, **MySQL database**, and **Nginx reverse proxy**.

---

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Prerequisites](#prerequisites)
- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Installation & Deployment](#installation--deployment)
- [Configuration](#configuration)
- [Access the Application](#access-the-application)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Troubleshooting](#troubleshooting)



---

## 📋 Prerequisites

- **Docker** (v20.10+)
- **Docker Compose** (v2.0+)
- **Port 80** available on your machine (for Nginx)
- 2GB RAM minimum

### Installation

- **Windows/Mac**: [Install Docker Desktop](https://www.docker.com/products/docker-desktop)
- **Linux**: Follow official [Docker installation guide](https://docs.docker.com/engine/install/)

---

## 📖 Project Overview

This project demonstrates a complete **three-tier architecture**:

| Tier | Component | Purpose |
|------|-----------|---------|
| **Presentation** | React + Nginx | User Interface & Static Files |
| **Application** | Node.js + Express | Business Logic & APIs |
| **Data** | MySQL | Persistent Data Storage |

**Additional**: Nginx Reverse Proxy routes all requests and acts as a single entry point.

---

## 🏗️ Architecture

```
                        Browser (Client)
                                │
                                ▼
                    ┌─────────────────────┐
                    │ Nginx Reverse Proxy │ (EC2 Port 80)
                    │ (Routes Requests)   │
                    └─────────────────────┘
                          │           │
                          │           │
             ┌────────────▼┐      ┌──▼──────────┐
             │             │      │              │
             ▼             ▼      ▼              ▼
        ┌─────────┐   ┌─────────────────┐   ┌──────────┐
        │  React  │   │  Express API    │───│  MySQL   │
        │Frontend │   │   Backend       │   │ Database │
        │(Nginx)  │   │  (Node.js)      │   │          │
        └─────────┘   └─────────────────┘   └──────────┘
        (Port 3000)   (Port 5000 Internal)  (Port 3306)
```

**Request Flow**:
- **User visits** → `http://<your-ec2-public-ip>`
- **Nginx routes** `/` → Frontend container
- **Nginx routes** `/api/*` → Backend container
- **Backend queries** → MySQL database
- **Response** → Back to user

---

## 🛠️ Technologies

| Tool | Version | Purpose |
|------|---------|---------|
| Docker | Latest | Container Virtualization |
| Docker Compose | v2+ | Multi-Container Orchestration |
| React | Latest | Frontend UI Framework |
| Node.js | 20-Alpine | Backend Runtime |
| Express | Latest | REST API Framework |
| MySQL | 8.4 | Relational Database |
| Nginx | Alpine | Reverse Proxy & Web Server |

---

## 📦 Installation & Deployment

### Step 1: Verify Prerequisites

```bash
docker --version
docker-compose --version
```

### Step 2: Clone/Navigate to Project

```bash
git clone <your-repository-url>
cd Docker/Project
```

### Step 3: Start the Application

```bash
docker-compose up -d
```

This command will:
- Download required images (if not present)
- Build custom images (frontend & backend)
- Create and start all 4 containers
- Set up networking and volumes




### Step 4: Wait for Services to Start

```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs -f
```

Once you see all containers with status `Up`, the application is ready!

### step5: Access the application

Open your browser and go to: http://<your-ec2-public-ip>
```

That's it! The application will be ready in about 30-60 seconds.

**Replace `<your-ec2-public-ip>` with your actual EC2 instance public IP address.**

### Stop the Application

```bash
docker-compose down
```

### Remove Everything (Including Data)

```bash
docker-compose down -v
```

---

## ⚙️ Configuration

### Environment Variables

Backend services use environment variables stored in `backend/.env`. Create this file with the following template:

```env
# Server Configuration
PORT=<Your API server port, typically 5000>

# Database Configuration
DB_HOST=<Database container name or host>
DB_PORT=<Database port, typically 3306>
DB_USER=<Database user username>
DB_PASSWORD=<Strong database password>
DB_NAME=<Database name for your application>
```

**Example values** (for local development):
```env
PORT=5000
DB_HOST=my-sql
DB_PORT=3306
DB_USER=admin
DB_PASSWORD=SecurePass123!
DB_NAME=application_db
```

⚠️ **Important**: 
- Never commit `.env` files to version control
- Use strong, unique passwords in production
- Update credentials for each environment (dev, staging, production)

### Docker Network

All containers communicate through an internal Docker bridge network:
- Frontend: `http://frontend`
- Backend: `http://backend:5000`
- Database: `my-sql:3306`

### Data Persistence

MySQL data is stored in a named volume `mysql-data`:
```bash
# View volumes
docker volume ls

# Inspect volume
docker volume inspect mysql-data
```

**Benefits**: Data persists even if containers are stopped or removed.

---

## 🌐 Access the Application

Once running, access the application:

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | `http://<your-ec2-public-ip>` | Web Application UI |
| Backend API | `http://<your-ec2-public-ip>/api` | API Endpoints |
| Database | Internal only | MySQL (not externally accessible) |

### Example API Endpoints

```bash
# Replace <your-ec2-public-ip> with your actual EC2 public IP

# Get all employees
curl http://<your-ec2-public-ip>/api/employees

# Add new employee
curl -X POST http://<your-ec2-public-ip>/api/employees \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com"}'
```

---

## 📂 Project Structure

```
Docker/Project/
├── docker-compose.yml          # Multi-container orchestration
├── Db_Query.sql                # Database initialization script
├── README.md                   # This file
│
├── frontend/                   # React Application
│   ├── Dockerfile              # Frontend container configuration
│   ├── package.json            # Dependencies
│   ├── vite.config.js          # Vite bundler config
│   ├── nginx.conf              # Nginx configuration (for SPA routing)
│   ├── src/
│   │   ├── App.jsx             # Main App component
│   │   ├── main.jsx            # Entry point
│   │   ├── components/         # Reusable components
│   │   ├── pages/              # Page components
│   │   └── services/           # API calls
│   └── public/                 # Static assets
│
├── backend/                    # Node.js/Express API
│   ├── Dockerfile              # Backend container configuration
│   ├── package.json            # Dependencies
│   ├── server.js               # Express server
│   ├── config/
│   │   └── db.js               # Database connection
│   ├── controllers/            # Business logic
│   ├── routes/                 # API endpoints
│   └── .env                    # Environment variables
│
└── nginx/                      # Reverse Proxy Configuration
    └── nginx.conf              # Routing rules
```

---

## 🔄 How It Works

### 1. **Frontend Build Process**
```
Node.js Image
   ↓ npm install
   ↓ npm run build
   ↓ Copy build files
   ↓ Nginx Image (serves static files)
```

### 2. **Backend Build Process**
```
Node.js Image
   ↓ npm install
   ↓ Copy source code
   ↓ Start Express server
   ↓ Ready on port 5000
```

### 3. **Database Initialization**
```
MySQL Image
   ↓ Create database
   ↓ Run Db_Query.sql
   ↓ Ready on port 3306
```

### 4. **Reverse Proxy Routing**
```
Browser Request → Nginx (Port 80)
   ├─ "/" → Frontend (Nginx server static files)
   └─ "/api/*" → Backend (Express API)
```

### 5. **Container Communication**
```
Frontend → Backend: http://backend:5000
Backend → Database: my-sql:3306
All via Docker DNS (automatic service discovery)
```

### 6. **SPA Routing**
Frontend uses React Router. Nginx config `try_files $uri $uri/ /index.html;` ensures:
- Page refreshes work correctly
- All routes handled by React client
- No 404 errors for dynamic routes

### 7. **Health Checks**
```
MySQL Health: mysqladmin ping
Backend Health: GET /health endpoint
Purpose: Ensure services are ready before dependent services start
```

---

## 📝 Notes for Development

- **Frontend**: Modify files in `frontend/src/`, container watches changes
- **Backend**: Modify files in `backend/`, may need to restart container
- **Database**: Changes to `Db_Query.sql` only apply on first run
- **Configuration**: Edit `.env` and restart containers for changes to take effect

---

## 🔐 Security Notes

⚠️ **For Production**:
- Change default database credentials in `backend/.env`
- Use environment-specific configurations
- Enable HTTPS/SSL in Nginx configuration
- Implement proper authentication & authorization
- Use secrets management instead of `.env` files
- Restrict database access to backend only

---

## 💡 Next Steps

1. Deploy on **AWS EC2** or similar cloud platform
2. Configure **SSL/TLS certificates** with Let's Encrypt
3. Set up **CI/CD pipeline** for automatic deployments
4. Implement **monitoring & logging** (ELK stack, Prometheus)
5. Add **automated backups** for database

---

## 📧 Support

For issues or questions, check the [Troubleshooting](#troubleshooting) section or review container logs using `docker-compose logs`.