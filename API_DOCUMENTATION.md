# API Documentation - CariKerja Backend (Golang)

## Base URL
```
http://localhost:8080/api/v1
```

## Authentication
Protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## Endpoints

### 1. Health Check

#### GET /health
Check service health status

**Response:**
```json
{
  "status": "ok",
  "service": "carikerja-backend-go"
}
```

---

### 2. Authentication

#### POST /api/v1/auth/register
Register a new candidate

**Request Body:**
```json
{
  "phone": "081234567890",
  "email": "candidate@example.com",
  "password": "password123",
  "full_name": "John Doe",
  "birth_date": "1990-01-15",
  "birth_place": "Jakarta",
  "address": "Jl. Sudirman No. 1",
  "city": "Jakarta",
  "province": "DKI Jakarta",
  "postal_code": "12345",
  "about_me": "Software Engineer with 5 years experience"
}
```

**Validation:**
- `phone`: required, min 10 chars, max 15 chars
- `email`: required, valid email format
- `password`: required, min 6 chars
- `full_name`: required, min 3 chars
- `birth_date`: optional, date string (YYYY-MM-DD format)
- `birth_place`: optional, string
- `address`: optional, string
- `city`: optional, string
- `province`: optional, string
- `postal_code`: optional, string
- `about_me`: optional, string

**Note:** Profile fields (birth_date, birth_place, address, etc.) are optional. If provided during registration, a candidate profile will be automatically created.

**Success Response (201):**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "candidate": {
      "id": "uuid",
      "phone": "081234567890",
      "email": "candidate@example.com",
      "full_name": "John Doe",
      "status": "ACTIVE",
      "created_at": "2025-11-23T10:00:00Z",
      "updated_at": "2025-11-23T10:00:00Z"
    }
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Registration failed",
  "error": "phone number already registered"
}
```

---

#### POST /api/v1/auth/login
Login with phone and password

**Request Body:**
```json
{
  "phone": "081234567890",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "candidate": {
      "id": "uuid",
      "phone": "081234567890",
      "email": "candidate@example.com",
      "full_name": "John Doe",
      "status": "ACTIVE",
      "last_login_at": "2025-11-23T10:00:00Z",
      "created_at": "2025-11-23T09:00:00Z",
      "updated_at": "2025-11-23T10:00:00Z"
    }
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "invalid phone or password"
}
```

---

### 3. Master Data (Public)

#### GET /api/v1/master/documents
Get all active document types (cached for 1 hour)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Document types retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "KTP",
      "slug": "ktp",
      "is_mandatory": true,
      "allowed_mimetypes": "image/jpeg,image/png",
      "chunkable": false,
      "stage": "REGISTRATION",
      "created_at": "2025-11-23T10:00:00Z",
      "updated_at": "2025-11-23T10:00:00Z"
    }
  ]
}
```

---

#### GET /api/v1/master/documents/mandatory
Get only mandatory document types (cached for 1 hour)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Mandatory document types retrieved successfully",
  "data": [...]
}
```

---

#### GET /api/v1/master/jobs
Get all active job postings (cached for 5 minutes)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Active jobs retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "title": "Frontend Developer",
      "slug": "frontend-developer",
      "description": "...",
      "requirements": "...",
      "salary_min": 10000000,
      "salary_max": 15000000,
      "quota": 2,
      "deadline": "2026-01-01T00:00:00Z",
      "status": "PUBLISHED",
      "created_at": "2025-11-23T09:00:00Z",
      "location": {
        "id": 7,
        "name": "Jakarta Selatan",
        "province": "DKI Jakarta"
      },
      "category": {
        "id": 5,
        "name": "Information Technology"
      },
      "company": {
        "id": "uuid",
        "name": "PT Teknologi Maju",
        "logo_url": null
      }
    }
  ]
}
```

---

#### GET /api/v1/master/job-categories
Get all job categories (cached for 24 hours)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Job categories retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Software Engineering",
      "slug": "software-engineering",
      "description": "Building and maintaining software systems.",
      "created_at": "2025-11-23T10:00:00Z",
      "updated_at": "2025-11-23T10:00:00Z"
    }
  ]
}
```

---

#### GET /api/v1/master/locations
Get all locations (cached for 24 hours)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Locations retrieved successfully",
  "data": [
    {
      "id": 1,
      "parent_id": null,
      "name": "Indonesia",
      "type": "COUNTRY",
      "created_at": "2025-11-23T10:00:00Z",
      "updated_at": "2025-11-23T10:00:00Z"
    },
    {
      "id": 2,
      "parent_id": 1,
      "name": "DKI Jakarta",
      "type": "PROVINCE",
      "created_at": "2025-11-23T10:00:00Z",
      "updated_at": "2025-11-23T10:00:00Z"
    }
  ]
}
```

---

### 4. Upload (Protected)


#### POST /api/v1/upload/init
Initialize document upload and get presigned URL

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "document_type_id": 1,
  "file_name": "ktp.jpg",
  "file_size": 1024000,
  "mime_type": "image/jpeg"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Upload initialized successfully",
  "data": {
    "document_id": "uuid",
    "presigned_url": "http://localhost:9000/agency-documents/candidates/...",
    "expires_in": 3600
  }
}
```

**Upload Flow:**
1. Call this endpoint to get presigned URL
2. Upload file directly to MinIO using the presigned URL:
   ```javascript
   await axios.put(presignedURL, file, {
     headers: { 'Content-Type': mimeType }
   });
   ```
3. Call `/upload/complete` to confirm upload

---

#### POST /api/v1/upload/complete
Mark upload as complete and trigger background processing

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "document_id": "uuid"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Upload completed successfully",
  "data": {
    "document_id": "uuid",
    "status": "UPLOADED",
    "message": "Document uploaded successfully and queued for processing"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Failed to complete upload",
  "error": "file not found in storage"
}
```

---

### 5. Profile (Protected)

#### GET /api/v1/profile
Get full candidate profile including education, experience, and skills.

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "candidate": {
        "id": "c1a7b3e8-5b1f-4f7e-8c3a-9b4a2d1c0e9f",
        "phone": "081234567890",
        "email": "candidate@example.com",
        "full_name": "John Doe",
        "hiring_status": "AVAILABLE"
    },
    "profile": {
      "id": "uuid",
      "candidate_id": "uuid",
      "nik": "1234567890123456",
      "birth_date": "1990-01-01T00:00:00Z",
      "gender": "M",
      "address": "Jl. Sudirman No. 1",
      "city": "Jakarta",
      "province": "DKI Jakarta",
      "postal_code": "12345",
      "last_education": "S1",
      "about_me": "Software Engineer with 5 years experience",
      "photo_url": "http://...",
      "cv_url": "http://..."
    },
    "educations": [
      {
        "id": "uuid",
        "institution_name": "University of Indonesia",
        "degree": "Bachelor",
        "major": "Computer Science",
        "start_year": 2010,
        "end_year": 2014,
        "is_current": false,
        "gpa": 3.8
      }
    ],
    "experiences": [
      {
        "id": "uuid",
        "company_name": "Tech Corp",
        "position": "Senior Engineer",
        "start_date": "2020-01-01T00:00:00Z",
        "is_current": true,
        "description": "Leading backend team"
      }
    ],
    "skills": [
      {
        "id": "uuid",
        "skill_name": "Golang",
        "proficiency_level": "Expert"
      }
    ]
  }
}
```

---

### 6. Candidate Dashboard (Protected)

#### GET /api/v1/applications
Get list of job applications with their status and timeline.

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "application": {
        "id": "uuid-of-application",
        "job_id": "uuid-of-job",
        "candidate_id": "uuid-of-candidate",
        "applied_at": "2025-11-23T10:00:00Z",
        "created_at": "2025-11-23T10:00:00Z",
        "updated_at": "2025-11-28T11:00:00Z",
        "reviewed_at": null,
        "reviewed_by": null,
        "rejection_reason": null,
        "revision_notes": null,
        "current_step": 10,
        "status": "PROCESSING_VISA",
        "job": {
          "id": "uuid-of-job",
          "client_profile_id": "uuid",
          "title": "Software Engineer",
          "slug": "software-engineer",
          "description": "Job description...",
          "requirements": "Requirements...",
          "job_category_id": 1,
          "location_id": 1,
          "salary_min": 10000000,
          "salary_max": 15000000,
          "quota": 5,
          "deadline": "2026-01-01T00:00:00Z",
          "status": "PUBLISHED",
          "created_at": "2025-11-20T09:00:00Z",
          "updated_at": "2025-11-20T09:00:00Z"
        }
      },
      "latest_status": "You are in the Visa process.",
      "timeline": [
        { "step": 1, "name": "Application Submitted", "status": "COMPLETED" },
        { "step": 2, "name": "Application Review", "status": "COMPLETED" },
        { "step": 3, "name": "Interview Scheduling", "status": "COMPLETED" },
        { "step": 4, "name": "Interview", "status": "COMPLETED" },
        { "step": 5, "name": "Interview Feedback", "status": "COMPLETED" },
        { "step": 6, "name": "Offering", "status": "COMPLETED" },
        { "step": 7, "name": "Offer Acceptance", "status": "COMPLETED" },
        { "step": 8, "name": "Hired", "status": "COMPLETED" },
        { "step": 9, "name": "Document Submission", "status": "COMPLETED" },
        { "step": 10, "name": "Visa Processing", "status": "IN_PROGRESS" },
        { "step": 11, "name": "Flight Scheduling", "status": "PENDING" },
        { "step": 12, "name": "Deployed", "status": "PENDING" }
      ]
    }
  ]
}
```

#### POST /api/v1/applications
Apply for a job.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "job_id": "uuid-of-job",
  "cover_letter": "I am very interested in this position...",
  "notes": "I can start immediately."
}
```
**Note:** `cover_letter` and `notes` are not currently saved to the database.

**Success Response (201):**
```json
{
  "success": true,
  "message": "Successfully applied for the job.",
  "data": null
}
```

**Error Response (500):**
```json
{
  "success": false,
  "message": "Failed to apply for job",
  "error": "you have already applied for this job"
}
```

#### GET /api/v1/tasks
Get a list of pending tasks for the candidate, such as required document uploads.

**Success Response (200):**
```json
{
  "success": true,
  "message": "Tasks retrieved successfully",
  "data": [
    {
      "application_id": "uuid-of-application",
      "job_title": "Software Engineer",
      "document_type": {
        "id": 3,
        "name": "Medical Check Up Result",
        "slug": "mcu",
        "is_mandatory": true,
        "allowed_mimetypes": "application/pdf,image/jpeg",
        "chunkable": false,
        "stage": "POST_HIRING",
        "created_at": "2025-11-23T10:00:00Z",
        "updated_at": "2025-11-23T10:00:00Z"
      },
      "status": "PENDING_UPLOAD",
      "notes": null
    },
    {
      "application_id": "uuid-of-application",
      "job_title": "Software Engineer",
      "document_type": {
        "id": 4,
        "name": "Passport",
        "slug": "passport",
        "is_mandatory": true,
        "allowed_mimetypes": "application/pdf,image/jpeg",
        "chunkable": false,
        "stage": "POST_HIRING",
        "created_at": "2025-11-23T10:00:00Z",
        "updated_at": "2025-11-23T10:00:00Z"
      },
      "status": "REJECTED",
      "notes": "Passport photo is blurry, please re-upload."
    }
  ]
}
```

#### GET /api/v1/analytics/profile-views
Get count of profile views.

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "views_count": 15
  }
}
```

#### GET /api/v1/jobs/recommendations
Get job recommendations for the candidate.

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Backend Engineer",
      "description": "...",
      "status": "PUBLISHED",
      "created_at": "..."
    }
  ]
}
```

#### GET /api/v1/documents
Get list of uploaded documents.

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "file_name": "cv.pdf",
      "status": "VALID",
      "created_at": "..."
    }
  ]
}
```

#### PUT /api/v1/profile
Update candidate profile details.


**Request Body:**
```json
{
  "nik": "1234567890123456",
  "birth_date": "1990-01-01T00:00:00Z",
  "birth_place": "Jakarta",
  "gender": "M",
  "address": "Jl. Sudirman No. 1",
  "city": "Jakarta",
  "province": "DKI Jakarta",
  "postal_code": "12345",
  "last_education": "S1",
  "about_me": "Software Engineer..."
}
```

#### POST /api/v1/profile/education
Add education history.

**Request Body:**
```json
{
  "institution_name": "University of Indonesia",
  "degree": "Bachelor",
  "major": "Computer Science",
  "start_year": 2010,
  "end_year": 2014,
  "is_current": false,
  "gpa": 3.8
}
```

#### PUT /api/v1/profile/education/:id
Update education history.

#### DELETE /api/v1/profile/education/:id
Delete education history.

#### POST /api/v1/profile/experience
Add work experience.

**Request Body:**
```json
{
  "company_name": "Tech Corp",
  "position": "Senior Engineer",
  "start_date": "2020-01-01T00:00:00Z",
  "is_current": true,
  "description": "Leading backend team"
}
```

#### PUT /api/v1/profile/experience/:id
Update work experience.

#### DELETE /api/v1/profile/experience/:id
Delete work experience.

#### POST /api/v1/profile/skill
Add skill.

**Request Body:**
```json
{
  "skill_name": "Golang",
  "proficiency_level": "Expert"
}
```

#### DELETE /api/v1/profile/skill/:id
Delete skill.

---

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (invalid/missing token) |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Response Format

All responses follow this structure:

**Success:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error description"
}
```

---

## JWT Token

**Expiry:** 72 hours (configurable via JWT_EXPIRY_HOURS)

**Claims:**
```json
{
  "candidate_id": "uuid",
  "phone": "081234567890",
  "email": "candidate@example.com",
  "exp": 1700000000,
  "iat": 1699913600,
  "nbf": 1699913600
}
```

---

## Rate Limiting

Currently not implemented. Will be added in Phase 7 (Infrastructure).

---

## Testing with Postman

Import the `postman_collection.json` file included in the repository.

The collection includes:
- Environment variables for base_url and auth_token
- Auto-save token after login/register
- All endpoints with example requests

---

## Testing with cURL

**Register:**
```bash
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "081234567890",
    "email": "test@example.com",
    "password": "password123",
    "full_name": "Test User"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "081234567890",
    "password": "password123"
  }'
```

**Get Document Types:**
```bash
curl http://localhost:8080/api/v1/master/documents
```

**Init Upload (with token):**
```bash
curl -X POST http://localhost:8080/api/v1/upload/init \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "document_type_id": "uuid-here",
    "file_name": "ktp.jpg",
    "file_size": 1024000,
    "mime_type": "image/jpeg"
  }'
```
