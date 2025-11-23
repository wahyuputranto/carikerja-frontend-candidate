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
  "full_name": "John Doe"
}
```

**Validation:**
- `phone`: required, min 10 chars, max 15 chars
- `email`: required, valid email format
- `password`: required, min 6 chars
- `full_name`: required, min 3 chars

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
      "id": "uuid",
      "name": "KTP",
      "slug": "ktp",
      "description": "Kartu Tanda Penduduk",
      "is_mandatory": true,
      "allowed_mimetypes": "image/jpeg,image/png",
      "max_file_size": 5242880,
      "chunkable": false,
      "is_active": true,
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
      "client_id": "uuid",
      "title": "Software Engineer",
      "description": "Job description...",
      "requirements": "Requirements...",
      "quota": 5,
      "status": "PUBLISHED",
      "published_at": "2025-11-23T10:00:00Z",
      "created_at": "2025-11-23T09:00:00Z",
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
  "document_type_id": "uuid",
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
