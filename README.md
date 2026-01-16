# 🏗️ NK Divanshu Builders - Backend API

**Professional Construction Company Management System**

A secure, scalable RESTful API backend for NK Divanshu Builders and Services Pvt Ltd, handling contact form submissions and construction package quote requests.

---

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Frontend Integration Guide](#-frontend-integration-guide)
- [Database Schema](#️-database-schema)
- [Security Features](#-security-features)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

This backend API serves as the foundation for NK Divanshu Builders' digital infrastructure, providing robust endpoints for customer inquiries, quote requests, and administrative data management.

**Company:** NK Divanshu Builders and Services Pvt Ltd  
**Purpose:** Construction package quotation and customer contact management  
**API Version:** 1.0.0  
**Database:** MongoDB Atlas  
**Environment:** Node.js + Express

---

## ✨ Features

### Core Functionality
- ✅ **Contact Form Management** - Handle customer inquiries with validation
- ✅ **Quote Request System** - Automated cost calculation for construction packages
- ✅ **Package Types** - Silver (₹1,599/sqft), Gold (₹1,999/sqft), Platinum (₹2,700/sqft)
- ✅ **Admin Dashboard Support** - RESTful endpoints for data retrieval and management

### Security & Performance
- 🔒 **Input Validation** - Comprehensive validation using express-validator
- 🛡️ **Rate Limiting** - Protection against spam and abuse
- 🔐 **CORS Protection** - Configurable cross-origin resource sharing
- 🪖 **Security Headers** - Helmet.js for HTTP security
- 📊 **Request Logging** - Morgan + custom logger
- 💾 **Database Indexing** - Optimized query performance

### Business Logic
- 💰 **Automatic Cost Calculation** - Real-time quote estimation
- 📧 **Email Format Validation** - Prevent invalid submissions
- 📱 **Phone Number Validation** - Ensure proper contact information
- 🗂️ **Status Tracking** - Monitor inquiry and quote lifecycle
- 📈 **Analytics & Statistics** - Aggregate reporting endpoints

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | Runtime environment |
| Express.js | 4.18+ | Web framework |
| MongoDB | 6.0+ | Database |
| Mongoose | 8.0+ | ODM for MongoDB |
| Express Validator | 7.0+ | Input validation |
| Helmet | 7.1+ | Security headers |
| CORS | 2.8+ | Cross-origin handling |
| Morgan | 1.10+ | HTTP logging |
| Dotenv | 16.3+ | Environment management |
| Express Rate Limit | 7.1+ | Rate limiting |

---

## 📁 Project Structure
```
nk-divanshu-backend/
│
├── src/
│   ├── config/
│   │   └── database.js              # MongoDB connection configuration
│   │
│   ├── models/
│   │   ├── ContactSubmission.js     # Contact form schema
│   │   └── QuoteRequest.js          # Quote request schema
│   │
│   ├── controllers/
│   │   ├── contact.controller.js    # Contact form business logic
│   │   └── quote.controller.js      # Quote request business logic
│   │
│   ├── routes/
│   │   ├── contact.routes.js        # Contact API routes
│   │   └── quote.routes.js          # Quote API routes
│   │
│   ├── validators/
│   │   ├── contact.validator.js     # Contact form validation rules
│   │   └── quote.validator.js       # Quote validation rules
│   │
│   ├── middleware/
│   │   ├── errorHandler.js          # Global error handling
│   │   └── rateLimiter.js           # Rate limiting configuration
│   │
│   ├── utils/
│   │   └── logger.js                # Custom logging utility
│   │
│   └── server.js                    # Main application entry point
│
├── logs/                             # Application logs (auto-generated)
│   ├── info.log
│   ├── error.log
│   └── requests.log
│
├── .env                              # Environment variables (not in git)
├── .env.example                      # Environment template
├── .gitignore                        # Git ignore rules
├── package.json                      # Dependencies and scripts
└── README.md                         # This file
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB Atlas Account** - [Sign up](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)
- **Postman** (optional, for testing) - [Download](https://www.postman.com/)

### Installation Steps

#### Step 1: Clone the Repository
```bash
git clone https://github.com/Suresh-kumar-barawar/nk-divanshu-backend.git
cd nk-divanshu-backend
```

#### Step 2: Install Dependencies
```bash
npm install
```

This will install all required packages listed in `package.json`.

#### Step 3: Set Up Environment Variables

Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Edit `.env` with your actual configuration:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb+srv://divanshu_admin:YOUR_PASSWORD@nk-divanshu-cluster.xxxxx.mongodb.net/nk_divanshu_db?retryWrites=true&w=majority

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,http://127.0.0.1:5500,file://

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Company Information
COMPANY_NAME=NK Divanshu Builders and Services Pvt Ltd
COMPANY_EMAIL=info@nkdivanshu.com
COMPANY_PHONE=+91 1234567890
```

#### Step 4: MongoDB Atlas Setup

1. **Create Project:**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Create a new project: "NK-Divanshu-Builders"

2. **Create Cluster:**
   - Build a database (M0 Free tier)
   - Choose region: Mumbai (ap-south-1) or nearest
   - Cluster name: `nk-divanshu-cluster`

3. **Create Database User:**
   - Username: `divanshu_admin`
   - Password: Create a strong password
   - Privileges: "Read and write to any database"

4. **Configure Network Access:**
   - For development: Allow access from anywhere (0.0.0.0/0)
   - For production: Whitelist specific IP addresses

5. **Create Collections:**
   - Database: `nk_divanshu_db`
   - Collections: `contact_submissions`, `quote_requests`

6. **Get Connection String:**
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Add `/nk_divanshu_db` after `.mongodb.net`

#### Step 5: Start the Server

**Development Mode** (with auto-restart):
```bash
npm run dev
```

**Production Mode**:
```bash
npm start
```

**Expected Output:**
```
✅ MongoDB Connected: nk-divanshu-cluster-shard-00-00.xxxxx.mongodb.net
📊 Database: nk_divanshu_db
🏢 Company: NK Divanshu Builders and Services Pvt Ltd
✅ 🏗️  NK Divanshu Builders - Server running on port 5000
ℹ️  📡 Environment: development
ℹ️  🌐 API available at http://localhost:5000
```

#### Step 6: Verify Installation

Open your browser and visit:
```
http://localhost:5000/health
```

You should see:
```json
{
  "success": true,
  "message": "Server is running",
  "company": "NK Divanshu Builders and Services Pvt Ltd",
  "timestamp": "2025-01-31T...",
  "uptime": 5.123
}
```

✅ **Success!** Your backend is running!

---

## 🌍 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `5000` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.net/db` |
| `ALLOWED_ORIGINS` | Comma-separated allowed domains | `http://localhost:3000,https://yourdomain.com` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `RATE_LIMIT_WINDOW_MS` | Rate limit time window (ms) | `900000` (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `100` |
| `COMPANY_NAME` | Company name for responses | `NK Divanshu Builders` |
| `COMPANY_EMAIL` | Company contact email | `info@nkdivanshu.com` |
| `COMPANY_PHONE` | Company phone number | `+91 1234567890` |

### Security Notes

⚠️ **IMPORTANT:**
- Never commit `.env` file to Git
- Use strong passwords for database users
- Rotate credentials regularly
- Use environment-specific values for production

---

## 📡 API Documentation

### Base URL

**Local Development:**
```
http://localhost:5000
```

**Production:**
```
https://your-domain.com
```

### Response Format

All API responses follow this structure:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Please enter a valid email"
    }
  ]
}
```

---

### 🔗 Endpoints

#### 1. Health Check

**GET** `/health`

Check if the server is running.

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "company": "NK Divanshu Builders and Services Pvt Ltd",
  "timestamp": "2025-01-31T10:30:00.000Z",
  "uptime": 123.45
}
```

---

#### 2. API Information

**GET** `/`

Get API information and available endpoints.

**Response:**
```json
{
  "success": true,
  "message": "NK Divanshu Builders and Services Pvt Ltd - API Server",
  "company": "NK Divanshu Builders and Services Pvt Ltd",
  "version": "1.0.0",
  "endpoints": {
    "health": "/health",
    "contact": "/api/contact",
    "quote": "/api/quote"
  }
}
```

---

#### 3. Submit Contact Form

**POST** `/api/contact`

Submit a customer contact inquiry.

**Rate Limit:** 5 requests per hour per IP

**Request Body:**
```json
{
  "name": "Rajesh Kumar",
  "email": "rajesh.kumar@example.com",
  "phone": "+91 9876543210",
  "subject": "Project",
  "message": "I am interested in constructing a 3BHK house."
}
```

**Field Validations:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `name` | String | Yes | 2-100 characters, letters only |
| `email` | String | Yes | Valid email format |
| `phone` | String | No | Valid phone format |
| `subject` | String | Yes | One of: `Consultation`, `Project`, `Partnership`, `Other` |
| `message` | String | Yes | 10-2000 characters |

**Success Response (201):**
```json
{
  "success": true,
  "message": "Thank you for contacting NK Divanshu Builders! Your message has been submitted successfully.",
  "data": {
    "id": "65b9c1234567890abcdef123",
    "name": "Rajesh Kumar",
    "email": "rajesh.kumar@example.com",
    "subject": "Project",
    "submittedAt": "2025-01-31T10:30:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please enter a valid email address"
    }
  ]
}
```

---

#### 4. Submit Quote Request

**POST** `/api/quote`

Submit a construction package quote request.

**Rate Limit:** 3 requests per hour per IP

**Request Body:**
```json
{
  "name": "Neha Singh",
  "email": "neha.singh@example.com",
  "phone": "+91 9988776655",
  "package": "Gold",
  "area": 2500,
  "message": "Interested in Gold package for 3BHK villa."
}
```

**Field Validations:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `name` | String | Yes | 2-100 characters |
| `email` | String | Yes | Valid email format |
| `phone` | String | Yes | Valid phone format |
| `package` | String | Yes | One of: `Silver`, `Gold`, `Platinum`, `Custom Package` |
| `area` | Number | Yes | 100-100,000 sq.ft |
| `message` | String | No | Max 2000 characters |

**Package Rates:**

| Package | Rate per sq.ft | Features |
|---------|----------------|----------|
| Silver | ₹1,599 | Basic construction, standard materials |
| Gold | ₹1,999 | Premium construction, quality materials |
| Platinum | ₹2,700 | Luxury construction, premium finishes |
| Custom | ₹2,000 | Customized specifications |

**Success Response (201):**
```json
{
  "success": true,
  "message": "Thank you for your interest! Your quote request has been submitted.",
  "data": {
    "id": "65b9c1234567890abcdef456",
    "name": "Neha Singh",
    "email": "neha.singh@example.com",
    "package": "Gold",
    "area": 2500,
    "estimatedCost": 4997500,
    "submittedAt": "2025-01-31T10:35:00.000Z"
  }
}
```

**Cost Calculation:** `area × rate = estimatedCost`  
Example: 2500 sq.ft × ₹1,999 = **₹49,97,500**

---

#### 5. Get All Contact Submissions (Admin)

**GET** `/api/contact`

Retrieve all contact form submissions with pagination.

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `status` | String | - | Filter by status: `new`, `read`, `responded`, `archived` |
| `page` | Number | 1 | Page number |
| `limit` | Number | 10 | Items per page |
| `sortBy` | String | `createdAt` | Sort field |
| `order` | String | `desc` | Sort order: `asc` or `desc` |

**Example:**
```
GET /api/contact?status=new&page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "count": 10,
  "total": 45,
  "currentPage": 1,
  "totalPages": 5,
  "data": [
    {
      "_id": "65b9c...",
      "name": "Rajesh Kumar",
      "email": "rajesh.kumar@example.com",
      "phone": "+91 9876543210",
      "subject": "Project",
      "message": "I am interested in...",
      "status": "new",
      "ipAddress": "192.168.1.1",
      "createdAt": "2025-01-31T10:30:00.000Z",
      "updatedAt": "2025-01-31T10:30:00.000Z"
    }
  ]
}
```

---

#### 6. Get Contact Statistics (Admin)

**GET** `/api/contact/stats`

Get aggregated statistics for contact submissions.

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 125,
    "byStatus": [
      { "_id": "new", "count": 45 },
      { "_id": "read", "count": 60 },
      { "_id": "responded", "count": 20 }
    ],
    "bySubject": [
      { "_id": "Project", "count": 70 },
      { "_id": "Consultation", "count": 35 },
      { "_id": "Partnership", "count": 15 },
      { "_id": "Other", "count": 5 }
    ]
  }
}
```

---

#### 7. Get All Quote Requests (Admin)

**GET** `/api/quote`

Retrieve all quote requests with filtering and pagination.

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `status` | String | - | Filter by status |
| `package` | String | - | Filter by package type |
| `page` | Number | 1 | Page number |
| `limit` | Number | 10 | Items per page |

**Example:**
```
GET /api/quote?package=Gold&status=pending&page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "count": 10,
  "total": 78,
  "currentPage": 1,
  "totalPages": 8,
  "data": [
    {
      "_id": "65b9c...",
      "name": "Neha Singh",
      "email": "neha.singh@example.com",
      "phone": "+91 9988776655",
      "package": "Gold",
      "area": 2500,
      "estimatedCost": 4997500,
      "message": "Interested in Gold package...",
      "status": "pending",
      "createdAt": "2025-01-31T10:35:00.000Z"
    }
  ]
}
```

---

#### 8. Get Quote Statistics (Admin)

**GET** `/api/quote/stats`

Get aggregated statistics for quote requests.

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 234,
    "byPackage": [
      {
        "_id": "Gold",
        "count": 98,
        "totalArea": 195000,
        "totalValue": 389805000
      },
      {
        "_id": "Silver",
        "count": 87,
        "totalArea": 130500,
        "totalValue": 208669500
      },
      {
        "_id": "Platinum",
        "count": 42,
        "totalArea": 168000,
        "totalValue": 453600000
      }
    ],
    "byStatus": [
      { "_id": "pending", "count": 145 },
      { "_id": "quoted", "count": 67 },
      { "_id": "accepted", "count": 22 }
    ],
    "recent": [...]
  }
}
```

---

#### 9. Get Single Contact (Admin)

**GET** `/api/contact/:id`

Get a specific contact submission by ID.

**Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

---

#### 10. Update Contact Status (Admin)

**PATCH** `/api/contact/:id/status`

Update the status of a contact submission.

**Request Body:**
```json
{
  "status": "read"
}
```

**Valid Status Values:** `new`, `read`, `responded`, `archived`

---

#### 11. Delete Contact (Admin)

**DELETE** `/api/contact/:id`

Delete a contact submission.

**Response:**
```json
{
  "success": true,
  "message": "Submission deleted successfully"
}
```

---

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 404 | Not Found |
| 409 | Conflict (duplicate entry) |
| 429 | Too Many Requests (rate limit) |
| 500 | Internal Server Error |

---

## 🎨 Frontend Integration Guide

### For Frontend Developers

This section helps frontend developers integrate their website with the NK Divanshu Builders backend API.

---

### Quick Start

#### 1. Ensure Backend is Running

Before testing, make sure the backend server is running:
```bash
cd nk-divanshu-backend
npm run dev
```

Verify at: `http://localhost:5000/health`

---

#### 2. CORS Configuration

The backend is configured to accept requests from common development origins:

**Allowed Origins (Development):**
- `http://localhost:3000` (React default)
- `http://localhost:5173` (Vite default)
- `http://127.0.0.1:5500` (Live Server)
- `file://` (Direct HTML files)

**To add your custom origin:**

Edit `.env` file in backend:
```env
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8080,http://your-custom-origin
```

Restart the backend after changes.

---

### Integration Examples

#### Option 1: Vanilla JavaScript (HTML/CSS/JS)

**Contact Form Example:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Us - NK Divanshu Builders</title>
</head>
<body>
  <form id="contactForm">
    <input type="text" id="name" placeholder="Your Name" required>
    <input type="email" id="email" placeholder="Email" required>
    <input type="tel" id="phone" placeholder="Phone Number">
    <select id="subject" required>
      <option value="">Select Subject</option>
      <option value="Consultation">Consultation</option>
      <option value="Project">Project Inquiry</option>
      <option value="Partnership">Partnership</option>
      <option value="Other">Other</option>
    </select>
    <textarea id="message" placeholder="Your Message" required></textarea>
    <button type="submit">Send Message</button>
  </form>

  <script>
    document.getElementById('contactForm').addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
      };
      
      try {
        const response = await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
          alert('✅ ' + data.message);
          this.reset();
        } else {
          const errors = data.errors ? data.errors.map(e => e.message).join('\n') : data.message;
          alert('❌ ' + errors);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('❌ Network error. Please try again.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
    });
  </script>
</body>
</html>
```

---

**Quote Request Form Example:**
```html
<form id="quoteForm">
  <input type="text" id="name" placeholder="Your Name" required>
  <input type="email" id="email" placeholder="Email" required>
  <input type="tel" id="phone" placeholder="Phone Number" required>
  <select id="package" required>
    <option value="">Select Package</option>
    <option value="Silver">Silver - ₹1,599/sqft</option>
    <option value="Gold">Gold - ₹1,999/sqft</option>
    <option value="Platinum">Platinum - ₹2,700/sqft</option>
    <option value="Custom Package">Custom Package</option>
  </select>
  <input type="number" id="area" placeholder="Area (sq.ft)" min="100" max="100000" required>
  <textarea id="message" placeholder="Special Requirements (Optional)"></textarea>
  <button type="submit">Get Quote</button>
</form>

<script>
  document.getElementById('quoteForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      package: document.getElementById('package').value,
      area: parseInt(document.getElementById('area').value),
      message: document.getElementById('message').value
    };
    
    try {
      const response = await fetch('http://localhost:5000/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        const cost = data.data.estimatedCost.toLocaleString('en-IN');
        alert(
          `✅ ${data.message}\n\n` +
          `📦 Package: ${data.data.package}\n` +
          `📏 Area: ${data.data.area} sq.ft\n` +
          `💰 Estimated Cost: ₹${cost}`
        );
        this.reset();
      } else {
        const errors = data.errors ? data.errors.map(e => e.message).join('\n') : data.message;
        alert('❌ ' + errors);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Network error. Please try again.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Get Quote';
    }
  });
</script>
```

---

#### Option 2: React.js

**Contact Form Component:**
```jsx
import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        alert('✅ ' + data.message);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        const errors = data.errors?.map(e => e.message).join('\n') || data.message;
        alert('❌ ' + errors);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your Name"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
      />
      <select
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        required
      >
        <option value="">Select Subject</option>
        <option value="Consultation">Consultation</option>
        <option value="Project">Project Inquiry</option>
        <option value="Partnership">Partnership</option>
        <option value="Other">Other</option>
      </select>
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Your Message"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

export default ContactForm;
```

---

#### Option 3: Next.js (App Router)

**API Route Handler:**
```javascript
// app/api/contact/route.js
export async function POST(request) {
  const body = await request.json();

  const response = await fetch('http://localhost:5000/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  return Response.json(data);
}
```

---

#### Option 4: Vue.js

**Contact Form Component:**
```vue
<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="formData.name" type="text" placeholder="Name" required>
    <input v-model="formData.email" type="email" placeholder="Email" required>
    <input v-model="formData.phone" type="tel" placeholder="Phone">
    <select v-model="formData.subject" required>
      <option value="">Select Subject</option>
      <option value="Consultation">Consultation</option>
      <option value="Project">Project Inquiry</option>
      <option value="Partnership">Partnership</option>
      <option value="Other">Other</option>
    </select>
    <textarea v-model="formData.message" placeholder="Message" required></textarea>
    <button type="submit" :disabled="loading">
      {{ loading ? 'Sending...' : 'Send Message' }}
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      },
      loading: false
    };
  },
  methods: {
    async handleSubmit() {
      this.loading = true;

      try {
        const response = await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.formData)
        });

        const data = await response.json();

        if (data.success) {
          alert('✅ ' + data.message);
          this.formData = { name: '', email: '', phone: '', subject: '', message: '' };
        } else {
          const errors = data.errors?.map(e => e.message).join('\n') || data.message;
          alert('❌ ' + errors);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('❌ Network error');
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
```

---

### Environment Variables (Frontend)

Create `.env` or `.env.local` in your frontend project:

**React/Vite:**
```env
VITE_API_URL=http://localhost:5000
```

**Next.js:**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Usage:**
```javascript
const API_URL = process.env.VITE_API_URL || process.env.NEXT_PUBLIC_API_URL;

fetch(`${API_URL}/api/contact`, { ... });
```

---

### Production Deployment

When deploying to production:

1. **Update Backend `.env`:**
```env
NODE_ENV=production
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

2. **Update Frontend API URL:**
```env
VITE_API_URL=https://api.yourdomain.com
```

3. **Use HTTPS** for all production API calls

---

### Testing Checklist for Frontend

- [ ] Backend server is running (`http://localhost:5000/health` returns 200)
- [ ] CORS is configured for your origin
- [ ] Form submits successfully
- [ ] Validation errors display correctly
- [ ] Success messages show properly
- [ ] Loading states work
- [ ] Form resets after successful submission
- [ ] Network errors are handled gracefully
- [ ] Rate limiting is respected (test by submitting multiple times)

---

### Common Issues & Solutions

**Issue 1: CORS Error**
```
Access to fetch has been blocked by CORS policy
```
**Solution:** Add your origin to `ALLOWED_ORIGINS` in backend `.env`

**Issue 2: Network Error**
```
Failed to fetch
```
**Solution:** 
- Check backend is running: `http://localhost:5000/health`
- Verify API URL is correct
- Check browser console for details

**Issue 3: 429 Rate Limit Error**
```
Too many requests
```
**Solution:** Wait 1 hour or restart backend server (development only)

**Issue 4: Validation Errors**
```
Please enter a valid email
```
**Solution:** Ensure all required fields are filled with valid data

---

### API Response Examples

**Success Response:**
```json
{
  "success": true,
  "message": "Thank you for contacting NK Divanshu Builders!",
  "data": {
    "id": "65b9c...",
    "name": "John Doe",
    "email": "john@example.com",
    "submittedAt": "2025-01-31T10:30:00.000Z"
  }
}
```

**Validation Error:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please enter a valid email address"
    },
    {
      "field": "message",
      "message": "Message must be at least 10 characters"
    }
  ]
}
```

**Rate Limit Error:**
```json
{
  "success": false,
  "message": "Too many form submissions. Please wait before submitting again.",
  "retryAfter": 3600
}
```

---

### Need Help?

- 📧 Backend Issues: Check `logs/error.log`
- 🐛 API Bugs: Open GitHub issue
- 💬 Questions: Contact backend team

---

## 🗄️ Database Schema

### Collection: `contact_submissions`
```javascript
{
  _id: ObjectId,
  name: String (required, 2-100 chars),
  email: String (required, valid email),
  phone: String (optional, valid format),
  subject: String (required, enum: ['Consultation', 'Project', 'Partnership', 'Other']),
  message: String (required, 10-2000 chars),
  status: String (default: 'new', enum: ['new', 'read', 'responded', 'archived']),
  ipAddress: String,
  userAgent: String,
  source: String (default: 'website'),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

**Indexes:**
- `email: 1`
- `status: 1`
- `createdAt: -1`
- `subject: 1, status: 1` (compound)

---

### Collection: `quote_requests`
```javascript
{
  _id: ObjectId,
  name: String (required, 2-100 chars),
  email: String (required, valid email),
  phone: String (required, valid format),
  package: String (required, enum: ['Silver', 'Gold', 'Platinum', 'Custom Package']),
  area: Number (required, 100-100000 sqft),
  message: String (optional, max 2000 chars),
  estimatedCost: Number (calculated),
  status: String (default: 'pending', enum: ['pending', 'quoted', 'accepted', 'rejected', 'archived']),
  ipAddress: String,
  userAgent: String,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

**Indexes:**
- `email: 1`
- `package: 1`
- `status: 1`
- `createdAt: -1`

---

## 🔒 Security Features

### Implemented Security Measures

1. **Input Validation**
   - express-validator for all inputs
   - SQL injection prevention via Mongoose
   - XSS protection via input sanitization

2. **Rate Limiting**
   - Contact form: 5 requests/hour per IP
   - Quote form: 3 requests/hour per IP
   - General API: 100 requests/15min per IP

3. **CORS Protection**
   - Configurable allowed origins
   - Credentials support
   - Method restrictions

4. **Security Headers (Helmet.js)**
   - Content Security Policy
   - X-Frame-Options
   - X-Content-Type-Options
   - Strict-Transport-Security

5. **Error Handling**
   - No sensitive data in error responses
   - Detailed logging for debugging
   - Production vs development error modes

6. **MongoDB Security**
   - IP whitelisting
   - Database user authentication
   - Connection string encryption

---

## 🧪 Testing

### Manual Testing with Postman

**Import Collection:**
1. Download Postman collection from `https://github.com/Suresh-kumar-barawar/nk-divanshu-backend/blob/main/NK-Divanshu-Builders-API.postman_collection.json`
2. Import into Postman
3. Set environment variable: `baseURL = http://localhost:5000`

**Test Scenarios:**

| Test | Endpoint | Expected Result |
|------|----------|-----------------|
| Health Check | GET `/health` | 200 OK |
| Valid Contact | POST `/api/contact` | 201 Created |
| Invalid Email | POST `/api/contact` | 400 Bad Request |
| Valid Quote | POST `/api/quote` | 201 Created |
| Rate Limit | POST `/api/contact` (6x) | 429 Too Many Requests |

---

### Automated Testing (Future)
```bash
# Install testing dependencies
npm install --save-dev jest supertest

# Run tests
npm test
```

---

## 🚀 Deployment

### Prerequisites

- Node.js hosting (Heroku, Railway, Render, DigitalOcean)
- MongoDB Atlas (already set up)
- Domain name (optional)

---

### Deployment Steps (Heroku Example)

1. **Install Heroku CLI**
```bash
npm install -g heroku
```

2. **Login to Heroku**
```bash
heroku login
```

3. **Create Heroku App**
```bash
heroku create nk-divanshu-api
```

4. **Set Environment Variables**
```bash
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_production_uri
heroku config:set ALLOWED_ORIGINS=https://yourdomain.com
```

5. **Deploy**
```bash
git push heroku main
```

6. **Verify**
```bash
heroku open /health
```

---

### Deployment Steps (Railway)

1. Connect GitHub repository
2. Add environment variables in dashboard
3. Deploy automatically on push

---

### Deployment Steps (DigitalOcean)

1. Create droplet (Ubuntu 22.04)
2. Install Node.js and PM2
3. Clone repository
4. Install dependencies
5. Configure PM2
```bash
pm2 start src/server.js --name "nk-divanshu-api"
pm2 save
pm2 startup
```

---

### Production Checklist

- [ ] Update MongoDB Network Access to production IP
- [ ] Set `NODE_ENV=production`
- [ ] Update `ALLOWED_ORIGINS` with production domain
- [ ] Use strong database passwords
- [ ] Enable MongoDB backup
- [ ] Set up SSL/TLS certificate
- [ ] Configure reverse proxy (Nginx)
- [ ] Set up monitoring (PM2, NewRelic)
- [ ] Configure logging service
- [ ] Set up error tracking (Sentry)
- [ ] Create backup strategy
- [ ] Document API endpoints
- [ ] Set up CI/CD pipeline

---

## 🐛 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Failed

**Error:**
```
Error connecting to MongoDB: MongoServerError
```

**Solutions:**
- ✅ Verify MongoDB URI in `.env`
- ✅ Check network access whitelist in Atlas
- ✅ Verify database user credentials
- ✅ Ensure cluster is active

---

#### 2. CORS Error

**Error:**
```
Access to fetch has been blocked by CORS policy
```

**Solutions:**
- ✅ Add your origin to `ALLOWED_ORIGINS` in `.env`
- ✅ Restart backend server after changing `.env`
- ✅ Clear browser cache
- ✅ Check if origin includes protocol (`http://`)

---

#### 3. Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions:**

**Windows:**
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
lsof -ti:5000 | xargs kill -9
```

Or change `PORT` in `.env`

---

#### 4. Rate Limit Exceeded

**Error:**
```
429 Too Many Requests
```

**Solutions:**
- ✅ Wait 1 hour for rate limit to reset
- ✅ For testing: Restart server to reset counter
- ✅ For production: Use different IP or contact admin

---

#### 5. Validation Errors

**Error:**
```
Validation failed: email: Please enter a valid email
```

**Solutions:**
- ✅ Check field requirements in API documentation
- ✅ Ensure all required fields are provided
- ✅ Verify data types match schema
- ✅ Check string length constraints

---

## 📚 Additional Resources

### Documentation
- [Express.js Docs](https://expressjs.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)

### Tutorials
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [REST API Design](https://restfulapi.net/)

### Tools
- [Postman](https://www.postman.com/) - API testing
- [MongoDB Compass](https://www.mongodb.com/products/compass) - Database GUI
- [VS Code](https://code.visualstudio.com/) - Code editor

---

## 🤝 Contributing

### How to Contribute

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Code Style

- Use ES6+ features
- Follow Airbnb JavaScript Style Guide
- Add comments for complex logic
- Write meaningful commit messages

---

## 📄 License

This project is proprietary software owned by the developers **Suresh Kumar | Darshan Kalamkar**.

All rights reserved. Unauthorized copying, distribution, or use is strictly prohibited.

---

## 👥 Team

**Backend Development Team**
- Lead Developer: **Suresh Kumar**
- Email: sureshbarawar1606@gmail.com

---

## 📞 Support

For technical support or questions:

- 📧 Email: darshan.suresh.devs@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/Suresh-kumar-barawar/nk-divanshu-backend/issues)

---

## 📝 Changelog

### Version 1.0.0 (2026-01-16)

**Initial Release**
- ✅ Contact form API
- ✅ Quote request API
- ✅ Rate limiting
- ✅ Input validation
- ✅ MongoDB integration
- ✅ CORS configuration
- ✅ Error handling
- ✅ Logging system
- ✅ Admin endpoints
- ✅ Statistics aggregation

---

## 🎯 Roadmap

### Planned Features

- [ ] Email notifications for submissions
- [ ] Admin authentication & dashboard
- [ ] File upload support
- [ ] SMS notifications
- [ ] Payment gateway integration
- [ ] Project tracking system
- [ ] Customer portal
- [ ] Automated quote generation
- [ ] Multi-language support
- [ ] Analytics dashboard

---

**Made with ❤️ by Darshan.Suresh.Devs**

---

Last Updated: January 16, 2026