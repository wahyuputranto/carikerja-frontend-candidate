# API Endpoint untuk Submit Application

## POST /api/v1/applications
Submit job application dari candidate

### Headers
```
Authorization: Bearer {token}
Content-Type: application/json
```

### Request Body
```json
{
  "job_id": "uuid-of-job",
  "cover_letter": "Surat lamaran minimal 100 karakter...",
  "notes": "Catatan tambahan (optional)"
}
```

### Success Response (201 Created)
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "data": {
    "application_id": "uuid-of-new-application",
    "job_id": "uuid-of-job",
    "candidate_id": "uuid-of-candidate",
    "cover_letter": "Surat lamaran...",
    "notes": "Catatan tambahan",
    "status": "SUBMITTED",
    "applied_at": "2025-11-25T07:05:00Z",
    "created_at": "2025-11-25T07:05:00Z"
  }
}
```

### Error Responses

**400 Bad Request** - Validation Error
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "job_id": "Job ID is required",
    "cover_letter": "Cover letter must be at least 100 characters"
  }
}
```

**404 Not Found** - Job not found
```json
{
  "success": false,
  "message": "Job not found or no longer available"
}
```

**409 Conflict** - Already applied
```json
{
  "success": false,
  "message": "You have already applied to this job"
}
```

**401 Unauthorized** - Not authenticated
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

### Validation Rules
- `job_id`: Required, must be valid UUID, job must exist and be active
- `cover_letter`: Required, minimum 100 characters, maximum 5000 characters
- `notes`: Optional, maximum 2000 characters

### Business Logic
1. Check if candidate has already applied to this job
2. Check if job is still active and accepting applications
3. Check if deadline has not passed
4. Create application record with status "SUBMITTED"
5. Create initial timeline entry
6. Send notification to candidate (email/in-app)
7. Send notification to recruiter/admin

### Example cURL
```bash
curl -X POST http://localhost:8080/api/v1/applications \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "job_id": "0ae47523-5a4d-493a-9dac-bc30ada036b4",
    "cover_letter": "Saya sangat tertarik dengan posisi ini karena...",
    "notes": "Saya dapat mulai bekerja segera"
  }'
```
