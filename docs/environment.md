# Environment Configuration

This document defines all environment variables and configuration for UFAS Cortex.

---

## Environment Files

| File | Purpose | Git Tracked |
|------|---------|-------------|
| `.env.local.example` | Template with all variables | Yes |
| `.env.local` | Local development secrets | No |
| `.env.production` | Production values (Vercel) | No |

---

## Required Variables

### Supabase Configuration

```bash
# Supabase Project URL
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co

# Supabase Anonymous Key (safe for client-side)
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Supabase Service Role Key (server-side only)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database connection string (for migrations, server-side)
DATABASE_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres
```

### Authentication

```bash
# OAuth Providers
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

NEXT_PUBLIC_MICROSOFT_CLIENT_ID=your-microsoft-client-id
MICROSOFT_CLIENT_SECRET=your-microsoft-client-secret
```

### AI Configuration

```bash
# OpenAI API
OPENAI_API_KEY=sk-your-openai-api-key
OPENAI_MODEL=gpt-4-turbo-preview
```

### Application

```bash
# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Environment mode
NODE_ENV=development
```

---

## Optional Variables

### Analytics

```bash
# Vercel Analytics (enabled by default in Vercel)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your-analytics-id

# Sentry Error Tracking
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
SENTRY_AUTH_TOKEN=your-sentry-auth-token
```

### Feature Flags

```bash
# Feature toggles
NEXT_PUBLIC_ENABLE_AI_FEATURES=true
NEXT_PUBLIC_ENABLE_COMMUNITY_FEATURES=true
NEXT_PUBLIC_ENABLE_SEARCH=true
```

### Storage

```bash
# Storage configuration
NEXT_PUBLIC_MAX_FILE_SIZE=52428800  # 50MB in bytes
NEXT_PUBLIC_ALLOWED_FILE_TYPES=application/pdf
```

### Rate Limiting

```bash
# Rate limits
RATE_LIMIT_AUTH_PER_MINUTE=10
RATE_LIMIT_API_PER_MINUTE=100
RATE_LIMIT_AI_PER_HOUR=20
RATE_LIMIT_DOWNLOADS_PER_HOUR=50
```

---

## Variable Reference

### `NEXT_PUBLIC_*` Variables

Variables prefixed with `NEXT_PUBLIC_` are:
- Embedded in client-side JavaScript
- Visible in browser
- Safe for public exposure
- Example: Supabase anon key

### Server-Only Variables

Variables without `NEXT_PUBLIC_` prefix:
- Only available in server components
- Never exposed to client
- Used for secrets and internal services
- Example: Service role key, OpenAI key

---

## Local Development Setup

### 1. Copy Template

```bash
cp .env.local.example .env.local
```

### 2. Fill in Values

```bash
# Required
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key
OPENAI_API_KEY=your-openai-key
```

### 3. OAuth Setup (Optional for Development)

Skip OAuth in development by using email/password only.

To test OAuth:
1. Create OAuth app in Google Cloud Console
2. Create OAuth app in Azure Portal (Microsoft)
3. Add redirect URIs:
   - `http://localhost:3000/auth/callback`

---

## Production Setup (Vercel)

### Automatic Variables

Vercel automatically sets:
- `VERCEL_URL`
- `VERCEL_ENV`
- `NODE_ENV`

### Environment Variables

Add in Vercel Dashboard → Settings → Environment Variables:

| Variable | Environment |
|----------|-------------|
| NEXT_PUBLIC_SUPABASE_URL | Production, Preview |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Production, Preview |
| SUPABASE_SERVICE_ROLE_KEY | Production, Preview |
| OPENAI_API_KEY | Production, Preview |
| NEXT_PUBLIC_APP_URL | Production |

### Domain-Specific Variables

For production domain:
```bash
NEXT_PUBLIC_APP_URL=https://ufas-cortex.vercel.app
```

---

## Supabase Configuration

### Dashboard Settings

Configure in Supabase Dashboard:

#### Authentication

1. Enable Email provider
2. Enable Google OAuth
3. Enable Microsoft OAuth
4. Set Site URL: `http://localhost:3000` (dev) or production URL
5. Add Redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `https://your-domain.com/auth/callback`

#### Storage

1. Create bucket: `resources`
2. Set public: false
3. Configure CORS for your domain

#### Database

1. Enable Row Level Security
2. Configure connection pooling (Supavisor)

---

## Security Checklist

### Never Commit

- `.env.local`
- Any file with real API keys
- Service role keys
- Database passwords

### Rotate Regularly

- OpenAI API keys: Quarterly
- OAuth client secrets: Annually
- Service role key: If compromised

### Use Different Values

Use different Supabase projects for:
- Development
- Staging/Preview
- Production

Or use different database schemas in same project.

---

## Vercel Integration

### Automatic Setup

When deploying to Vercel:

1. Link GitHub repository
2. Framework: Next.js (auto-detected)
3. Environment variables: Import from `.env.local`

### Preview Deployments

Each PR gets a preview URL:
```
https://ufas-cortex-abc123.vercel.app
```

Update Supabase allowed URLs for OAuth.

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| "Invalid API key" | Check NEXT_PUBLIC_ prefix for client vars |
| "CORS error" | Add domain to Supabase allowed origins |
| "OAuth failed" | Check redirect URLs match exactly |
| "Database connection failed" | Check DATABASE_URL format |

### Debug Mode

Enable verbose logging:
```bash
DEBUG=supabase:* npm run dev
```

### Check Variables

In browser console:
```javascript
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
```

In server components:
```typescript
console.log(process.env.SUPABASE_SERVICE_ROLE_KEY);
```

---

## Template File

See `.env.local.example` for the complete template with all variables.
