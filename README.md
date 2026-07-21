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

```
Open your browser and go to: http://<your-ec2-public-ip>
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
