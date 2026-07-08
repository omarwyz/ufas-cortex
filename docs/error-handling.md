# Error Handling

This document defines the error handling strategy for UFAS Cortex.

---

## Error Categories

### Client Errors (4xx)

| Code | Name | Description |
|------|------|-------------|
| 400 | BAD_REQUEST | Invalid request data |
| 401 | UNAUTHORIZED | Authentication required |
| 403 | FORBIDDEN | Insufficient permissions |
| 404 | NOT_FOUND | Resource not found |
| 409 | CONFLICT | Resource conflict |
| 422 | UNPROCESSABLE_ENTITY | Validation failed |
| 429 | TOO_MANY_REQUESTS | Rate limit exceeded |

### Server Errors (5xx)

| Code | Name | Description |
|------|------|-------------|
| 500 | INTERNAL_ERROR | Unexpected server error |
| 502 | BAD_GATEWAY | External service error |
| 503 | SERVICE_UNAVAILABLE | Service temporarily unavailable |

---

## Error Codes

### Authentication Errors

| Code | HTTP Status | Message |
|------|-------------|---------|
| AUTH_REQUIRED | 401 | Authentication required |
| INVALID_CREDENTIALS | 401 | Invalid email or password |
| SESSION_EXPIRED | 401 | Session has expired |
| TOKEN_INVALID | 401 | Invalid authentication token |
| EMAIL_NOT_VERIFIED | 403 | Email not verified |

### Authorization Errors

| Code | HTTP Status | Message |
|------|-------------|---------|
| FORBIDDEN | 403 | Access denied |
| ADMIN_ONLY | 403 | Admin access required |
| PREMIUM_REQUIRED | 403 | Premium subscription required |
| QUOTA_EXCEEDED | 403 | Feature quota exceeded |

### Resource Errors

| Code | HTTP Status | Message |
|------|-------------|---------|
| NOT_FOUND | 404 | Resource not found |
| RESOURCE_ARCHIVED | 404 | Resource has been archived |
| FILE_NOT_FOUND | 404 | File not found in storage |

### Validation Errors

| Code | HTTP Status | Message |
|------|-------------|---------|
| VALIDATION_ERROR | 422 | Invalid input data |
| REQUIRED_FIELD | 422 | Required field missing |
| INVALID_EMAIL | 422 | Invalid email format |
| PASSWORD_TOO_SHORT | 422 | Password too short |
| INVALID_CODE | 422 | Invalid activation code |

### Rate Limiting Errors

| Code | HTTP Status | Message |
|------|-------------|---------|
| RATE_LIMIT_EXCEEDED | 429 | Too many requests |
| DOWNLOAD_LIMIT | 429 | Download limit exceeded |
| AI_QUOTA_EXCEEDED | 429 | AI generation quota exceeded |

### Premium Errors

| Code | HTTP Status | Message |
|------|-------------|---------|
| CODE_ALREADY_USED | 409 | Activation code already used |
| CODE_EXPIRED | 409 | Activation code has expired |
| CODE_NOT_FOUND | 404 | Activation code not found |
| ALREADY_PREMIUM | 409 | User already has active subscription |

### File Errors

| Code | HTTP Status | Message |
|------|-------------|---------|
| FILE_TOO_LARGE | 422 | File exceeds maximum size |
| INVALID_FILE_TYPE | 422 | File type not allowed |
| UPLOAD_FAILED | 500 | File upload failed |

### Server Errors

| Code | HTTP Status | Message |
|------|-------------|---------|
| INTERNAL_ERROR | 500 | An unexpected error occurred |
| DATABASE_ERROR | 500 | Database operation failed |
| AI_SERVICE_ERROR | 502 | AI service unavailable |

---

## Error Response Format

### Standard Error

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
      },
      {
        "field": "password",
        "message": "Password must be at least 8 characters"
      }
    ]
  }
}
```

### Simple Error

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

### Error with Retry

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

## Client-Side Error Handling

### React Error Boundary

Wrap components that may throw:

```tsx
<ErrorBoundary fallback={<ErrorFallback />}>
  <ResourceList />
</ErrorBoundary>
```

### Form Error Handling

Display field-level errors:

```tsx
<Form>
  <Input
    name="email"
    error={errors.email?.message}
  />
  {errors.root && <Alert type="error">{errors.root.message}</Alert>}
</Form>
```

### Toast Notifications

Show temporary error messages:

```tsx
toast.error("Failed to save changes");
```

---

## Server-Side Error Handling

### API Route Error Handler

```typescript
export async function GET(request: Request) {
  try {
    const data = await getResource();
    return Response.json({ success: true, data });
  } catch (error) {
    return handleError(error);
  }
}
```

### Error Handler Function

```typescript
function handleError(error: unknown): Response {
  if (error instanceof ValidationError) {
    return Response.json(
      {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: error.message,
          details: error.details
        }
      },
      { status: 422 }
    );
  }
  
  if (error instanceof NotFoundError) {
    return Response.json(
      {
        success: false,
        error: {
          code: "NOT_FOUND",
          message: error.message
        }
      },
      { status: 404 }
    );
  }
  
  // Log unexpected errors
  console.error("Unexpected error:", error);
  
  return Response.json(
    {
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message: "An unexpected error occurred"
      }
    },
    { status: 500 }
  );
}
```

---

## Logging

### Error Logging

All errors logged with:

```typescript
{
  timestamp: Date,
  level: "error" | "warn" | "info",
  message: string,
  code: string,
  userId?: string,
  requestId?: string,
  path?: string,
  method?: string,
  stack?: string
}
```

### Log Levels

| Level | Usage |
|-------|-------|
| error | Unhandled exceptions, critical failures |
| warn | Recoverable errors, validation failures |
| info | Important events, user actions |

### External Logging (Production)

Sentry integration for production:

```typescript
Sentry.captureException(error, {
  user: { id: userId },
  tags: { feature: "ai" }
});
```

---

## User-Facing Messages

### Generic Messages (Don't Expose Internals)

| Situation | User Message |
|-----------|--------------|
| Database error | "Unable to save. Please try again." |
| Network error | "Connection failed. Check your internet." |
| AI service error | "AI feature temporarily unavailable." |
| Unknown error | "Something went wrong. Please try again." |

### Specific Messages

| Situation | User Message |
|-----------|--------------|
| Invalid code | "This activation code is invalid." |
| Code used | "This code has already been used." |
| Quota exceeded | "You've reached your monthly limit." |
| Premium required | "This feature requires a premium subscription." |

---

## Error Recovery

### Automatic Retry

For transient errors:

```typescript
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3
): Promise<T> {
  let lastError: Error;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      await new Promise(r => setTimeout(r, 1000 * Math.pow(2, i)));
    }
  }
  
  throw lastError;
}
```

### Graceful Degradation

When features fail:

- Show cached data if available
- Provide manual refresh option
- Display offline message for network failures
- Allow form save drafts to localStorage

---

## Validation Schemas

### Zod Example

```typescript
const signupSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  yearId: z.string().uuid("Invalid year selection")
});
```

### Validation Error Format

```typescript
{
  success: false,
  error: {
    code: "VALIDATION_ERROR",
    message: "Invalid input data",
    details: [
      {
        field: "email",
        code: "invalid_string",
        message: "Invalid email format"
      }
    ]
  }
}
```
