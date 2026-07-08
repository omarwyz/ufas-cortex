# Security

## Authentication

### Supabase Auth Implementation

The platform uses Supabase Auth for all authentication functionality.

#### Authentication Methods

| Method | Status | Notes |
|--------|--------|-------|
| Email/Password | Primary | All email domains allowed |
| Google OAuth | Supported | Social login |
| Microsoft OAuth | Supported | University integration |

#### Session Management

- Session duration: 7 days (configurable)
- Refresh tokens: Automatic rotation
- Session storage: HTTP-only cookies (server-side)
- Concurrent sessions: Allowed (up to 5 devices)

#### Password Requirements

- Minimum length: 8 characters
- Maximum length: 128 characters
- Complexity: Not enforced (Supabase default)
- Password hashing: bcrypt (handled by Supabase)
- Password reset: Token-based with 1-hour expiry

#### OAuth Flow Security

- PKCE (Proof Key for Code Exchange) enabled
- State parameter validation
- CSRF protection via same-origin policy
- Redirect URL whitelist enforced

---

## Authorization

### Role-Based Access Control (RBAC)

| Role | Access Level | Description |
|------|--------------|-------------|
| `anon` | None | Unauthenticated visitors |
| `authenticated` | Student | Logged-in students |
| `premium` | Premium Student | Active premium subscription |
| `admin` | Administrator | Full platform management |

### Permission Matrix

| Resource | anon | authenticated | premium | admin |
|----------|------|---------------|---------|-------|
| View landing page | Yes | Yes | Yes | Yes |
| Browse resources | No | Yes | Yes | Yes |
| Download resources | No | Yes | Yes | Yes |
| AI Summaries | No | No | Yes | Yes |
| AI Exam Generator | No | No | Yes | Yes |
| AI Flashcards | No | No | Yes | Yes |
| Upload resources | No | No | No | Yes |
| Manage users | No | No | No | Yes |
| Manage subjects | No | No | No | Yes |
| Generate activation codes | No | No | No | Yes |

### Row-Level Security (RLS)

All tables have RLS enabled with policies enforcing:

1. **Users**: Can only read/update own profile
2. **Resources**: Authenticated users can read; admins can write
3. **Bookmarks**: Users can only access own bookmarks
4. **Downloads**: Users can only access own download history
5. **AI Features**: Only premium users can access
6. **Admin Tables**: Only admin role can access

---

## Data Protection

### Data Classification

| Classification | Description | Examples |
|----------------|-------------|----------|
| Public | Visible to all users | Landing page content |
| Internal | Authenticated users only | Resources, subjects |
| Private | User-specific data | Bookmarks, downloads |
| Restricted | Admin only | Activation codes, user management |

### Data Retention

| Data Type | Retention Period | Deletion Method |
|-----------|------------------|-----------------|
| User accounts | Indefinite (until deleted) | User-initiated or admin |
| Session data | 7 days | Automatic cleanup |
| Download history | 1 year | Automatic cleanup |
| AI generations | 90 days | Automatic cleanup |
| Audit logs | 2 years | Automatic cleanup |

### User Rights

Users have the right to:
- Export their personal data
- Delete their account
- View their data processing history
- Revoke OAuth permissions

---

## API Security

### Rate Limiting

| Endpoint Category | Limit | Window |
|-------------------|-------|--------|
| Authentication | 10 requests | 1 minute |
| API (authenticated) | 100 requests | 1 minute |
| AI Generation | 20 requests | 1 hour |
| Downloads | 50 requests | 1 hour |

### API Key Security

- Supabase anon key: Public (safe for client-side)
- Supabase service role key: Server-side only
- OpenAI API key: Server-side only (Edge Functions)

### Request Validation

- All inputs validated with Zod schemas
- SQL injection prevented via Supabase client
- XSS prevention via React's automatic escaping
- CSRF protection via SameSite cookies

---

## Infrastructure Security

### HTTPS

- TLS 1.2+ enforced everywhere
- HSTS header enabled
- Certificate pinning on mobile (future)

### Headers

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### Cookie Security

- HttpOnly: Yes
- Secure: Yes (production)
- SameSite: Lax
- Domain: Platform domain only

---

## Incident Response

### Security Event Logging

All security events are logged:
- Failed login attempts
- Password reset requests
- OAuth flow completions
- Role changes
- Admin actions

### Alerting Thresholds

- 5+ failed login attempts: Account temporarily locked
- 100+ API requests/minute: Rate limit warning
- Unusual download patterns: Admin notification

### Breach Response

1. Identify and contain the breach
2. Assess affected data
3. Notify affected users within 72 hours
4. Document incident and remediation
5. Update security measures

---

## Development Security

### Secrets Management

- Environment variables stored in `.env.local`
- Never commit secrets to git
- Supabase secrets managed by platform
- OpenAI key rotated quarterly

### Dependency Security

- npm audit run on every CI build
- Dependabot enabled for security updates
- Lockfile committed to repository

### Code Review

- All changes reviewed before merge
- Security-sensitive changes require additional review
- Automated security scanning via CodeQL

---

## Compliance

### GDPR Considerations

- Data minimization: Only collect necessary data
- Purpose limitation: Data used only for stated purposes
- User consent: Explicit consent for data collection
- Right to access: Users can view their data
- Right to deletion: Users can delete their account
- Data portability: Users can export their data

### Cookie Policy

- Essential cookies: Required for authentication
- No tracking cookies
- No third-party cookies
- No advertising cookies
