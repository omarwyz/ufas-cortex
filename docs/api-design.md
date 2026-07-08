# API Design

This document defines the RESTful API architecture for UFAS Cortex.

---

## Base URL Structure

```
Development: http://localhost:3000/api
Production: https://ufas-cortex.vercel.app/api
```

All API routes are under `/api/*` using Next.js App Router API routes.

---

## Authentication

### Headers

All authenticated requests require:

```
Authorization: Bearer <session_token>
```

The session token is managed automatically by Supabase Auth client.

### Session Management

- Sessions stored in HTTP-only cookies
- Automatic token refresh handled by Supabase client
- Session validation via middleware

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/signup | Create new account |
| POST | /api/auth/login | Authenticate user |
| POST | /api/auth/logout | End session |
| POST | /api/auth/reset-password | Request password reset |
| GET | /api/auth/callback | OAuth callback handler |
| GET | /api/auth/session | Get current session |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/users/me | Get current user profile |
| PATCH | /api/users/me | Update profile |
| DELETE | /api/users/me | Delete account |

### Resources

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/resources | List all resources (paginated) |
| GET | /api/resources/:id | Get single resource |
| POST | /api/resources | Create resource (admin only) |
| PATCH | /api/resources/:id | Update resource (admin only) |
| DELETE | /api/resources/:id | Delete resource (admin only) |

### Academic Structure

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/years | List academic years |
| GET | /api/years/:id/subjects | Get subjects for year |
| GET | /api/subjects/:id | Get subject details |
| GET | /api/subjects/:id/resources | Get resources for subject |

### Search

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/search | Search resources |
| GET | /api/search/suggestions | Get search suggestions |

### Bookmarks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/bookmarks | List user bookmarks |
| POST | /api/bookmarks | Add bookmark |
| DELETE | /api/bookmarks/:id | Remove bookmark |

### Downloads

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/downloads | List download history |
| POST | /api/downloads | Record download |
| GET | /api/downloads/:id/url | Get download URL |

### Premium

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/premium/status | Check premium status |
| POST | /api/premium/activate | Activate code |
| GET | /api/premium/quota | Get quota usage |

### AI Features

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/ai/summarize | Generate summary |
| POST | /api/ai/exam | Generate exam |
| POST | /api/ai/flashcards | Generate flashcards |
| GET | /api/ai/summaries | List user summaries |
| GET | /api/ai/exams | List user exams |
| GET | /api/ai/flashcards | List user flashcard decks |

### Admin

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/admin/users | List all users |
| GET | /api/admin/users/:id | Get user details |
| PATCH | /api/admin/users/:id | Update user |
| POST | /api/admin/resources/upload | Upload resource |
| GET | /api/admin/codes | List activation codes |
| POST | /api/admin/codes/generate | Generate codes |
| PATCH | /api/admin/codes/:id | Disable code |
| GET | /api/admin/analytics | Get analytics data |
| GET | /api/admin/settings | Get settings |
| PATCH | /api/admin/settings | Update settings |

---

## Request/Response Format

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

---

## Pagination

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | number | 1 | Page number |
| limit | number | 20 | Items per page (max 100) |
| sort | string | created_at | Sort field |
| order | string | desc | Sort order (asc/desc) |

### Response Meta

```json
{
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### Cursor Pagination (for real-time data)

For streams or real-time updates, use cursor-based pagination:

```
GET /api/downloads?cursor=abc123&limit=20
```

Response:
```json
{
  "data": [...],
  "nextCursor": "def456",
  "hasMore": true
}
```

---

## Filtering

### Common Filters

Resources support:
- `year_id` - Filter by academic year
- `subject_id` - Filter by subject
- `type` - Filter by resource type
- `search` - Full-text search query
- `from_date` - Created after date
- `to_date` - Created before date

Example:
```
GET /api/resources?year_id=1&subject_id=5&type=exam&sort=downloads&order=desc
```

---

## Sorting

Most endpoints support sorting:

| Parameter | Description |
|-----------|-------------|
| sort | Field to sort by |
| order | asc or desc |

Common sort fields:
- `created_at` - Creation date
- `updated_at` - Last modified
- `title` - Alphabetical
- `downloads` - Popularity

---

## Rate Limiting

### Headers

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1625097600
```

### Limits

| Endpoint Category | Limit | Window |
|-------------------|-------|--------|
| Authentication | 10 | 1 minute |
| General API | 100 | 1 minute |
| AI Generation | 20 | 1 hour |
| Downloads | 50 | 1 hour |

### Rate Limit Exceeded

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests",
    "retryAfter": 60
  }
}
```

---

## Versioning

Current version: v1 (implicit)

Future versions will use URL prefix:
```
/api/v2/resources
```

Version 1 will remain available for backwards compatibility.

---

## OpenAPI Specification

Full API documentation available at:
```
GET /api/docs (future)
```

OpenAPI JSON spec:
```
GET /api/docs/openapi.json (future)
```

---

## WebSocket Events (Future)

Real-time features will use Supabase Realtime:

| Channel | Event | Description |
|---------|-------|-------------|
| notifications | INSERT | New notification |
| posts | INSERT | New post |
| comments | INSERT | New comment |

---

## Security Considerations

### Input Validation

All inputs validated with Zod schemas before processing.

### SQL Injection

Prevented via Supabase client parameterized queries.

### XSS

Prevented via React's automatic escaping.

### CSRF

Protected via SameSite cookies.

### File Uploads

- Maximum size: 50MB
- Allowed types: PDF only
- Virus scanning: Future consideration
