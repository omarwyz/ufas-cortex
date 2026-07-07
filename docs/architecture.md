# System Architecture

## Executive Summary

UFAS Cortex is designed as a **modern, scalable SaaS platform** using a **Next.js full-stack monolithic architecture** with clear service separation. This approach balances fast solo development with production-grade reliability and future scalability.

---

## 1. Technology Stack

### Core Choices (Rationale Below)

| Layer | Technology | Version | Reasoning |
|-------|-----------|---------|-----------|
| **Frontend** | Next.js + React | 14+ | Full-stack TypeScript, SSR/SSG, built-in API routes, AI-assisted development ready |
| **Backend** | Next.js API Routes | - | Eliminates separate backend repo; single deploy pipeline |
| **Database** | PostgreSQL | 15+ | Relational data fits academic structure; JSONB for flexibility; proven at scale |
| **Cache** | Redis | 7+ | Session storage, rate limiting, real-time features; minimal ops overhead |
| **Storage** | AWS S3 (or MinIO self-hosted) | - | Scalable file storage for PDFs, notes; CDN integration |
| **AI/LLM** | OpenAI API (gpt-4-turbo) | - | Industry standard for medical education; proven quality |
| **Real-time** | Socket.io + Redis | - | Study groups, live discussions, notifications |
| **Search** | PostgreSQL Full-Text Search (MVP), Elasticsearch later | - | Start simple; scale when needed |
| **ORM** | Prisma | 5+ | Type-safe, auto-migrations, superior DX for AI-assisted coding |
| **Auth** | NextAuth.js | 5+ | OAuth + JWT; integrates seamlessly; session management built-in |
| **Monitoring** | Vercel Analytics + Sentry | - | Low-ops; Vercel native, error tracking for debugging |
| **Testing** | Vitest + Playwright | - | Fast unit tests + E2E; works with Cursor/Copilot workflows |
| **Language** | TypeScript | 5.2+ | Type safety, AI-assisted development, fewer bugs in production |

---

### 2. Architectural Decision Analysis

#### **2.1 Frontend: Next.js vs Alternatives**

**Candidates:**
- Next.js (full-stack SSR framework)
- SvelteKit (lighter, faster learning curve)
- Remix (file-based routing alternative)
- React SPA + separate Node.js backend

**Comparison Table:**

| Criteria | Next.js | SvelteKit | Remix | React SPA |
|----------|---------|----------|-------|-----------|
| **Solo Dev Speed** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **AI Copilot Support** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Scalability** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Learning Curve** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Ecosystem Size** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Job Market** | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

**✅ Recommendation: Next.js**

**Why:**
1. **Full-stack in one repo** = easier for solo dev, single deployment
2. **Built-in API routes** = no need for separate backend server
3. **Vercel deployment** = automatic scaling, free tier generous
4. **App Router** (v13+) = superior DX for Copilot/Cursor
5. **Best-in-class SSR/ISR** = SEO benefit for medical resources
6. **Largest AI support** = Cursor, Copilot optimized for Next.js

**Trade-offs of Alternatives:**
- **SvelteKit**: Smaller ecosystem; harder to find Copilot examples
- **Remix**: Good but steeper learning curve; less Vercel native
- **React SPA + Node.js**: Two repos = twice the complexity for solo dev

---

#### **2.2 Backend: Next.js API Routes vs Express/Fastify**

**Candidates:**
- Next.js API Routes + Middleware
- Express.js (lightweight, largest ecosystem)
- Fastify (performance-focused)
- NestJS (enterprise patterns)

**Comparison:**

| Criteria | Next.js Routes | Express | Fastify | NestJS |
|----------|---------------|---------|---------|--------|
| **Dev Speed** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Setup Complexity** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| **Type Safety** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Deployment Simplicity** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Scalability** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

**✅ Recommendation: Next.js API Routes**

**Why:**
1. **No separate backend deployment** = one Vercel project handles everything
2. **TypeScript out-of-box** = no extra config
3. **Middleware system** = CORS, auth, rate limiting baked-in
4. **Serverless ready** = auto-scales with Vercel
5. **Same repo = faster iteration** = solo dev productivity

**When to Reconsider:**
- If you need **extreme throughput** (1000+ req/sec) → Fastify wins, but Redis caching solves this first
- If you have **multiple backend teams** → separate Express/Fastify, but premature for MVP
- If you need **complex dependency injection** → NestJS, but overkill initially

---

#### **2.3 Database: PostgreSQL vs MongoDB**

**Candidates:**
- PostgreSQL (relational)
- MongoDB (document-based)
- Firebase Realtime DB
- Supabase (PostgreSQL + Auth)

**Comparison:**

| Feature | PostgreSQL | MongoDB | Firebase | Supabase |
|---------|-----------|---------|----------|----------|
| **ACID Transactions** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Relational Integrity** | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Query Flexibility** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Full-Text Search** | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐ | ⭐⭐⭐⭐ |
| **Self-Hosted Options** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ❌ | ⭐⭐⭐⭐⭐ |
| **Learning Curve** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

**✅ Recommendation: PostgreSQL**

**Why:**
1. **Academic structure is inherently relational** = Years → Subjects → Resources
2. **Transactions matter** = Premium purchases, resource downloads must be atomic
3. **JSONB support** = flexibility of MongoDB when needed (metadata fields)
4. **Full-text search built-in** = no extra infrastructure
5. **Self-host capability** = no vendor lock-in (critical for educational institution)
6. **Better price-performance** = cheaper at scale than MongoDB Atlas

**Hosting Choice:**
- **MVP (0-100 students)**: Supabase free tier (PostgreSQL + Auth + instant REST API)
- **Growth (100-10k)**: Railway or Render ($7-20/mo) for PostgreSQL
- **Scale (10k+)**: Self-hosted or AWS RDS

**Alternative: Supabase First**
- Supabase = PostgreSQL + built-in Auth + Realtime subscriptions
- Saves NextAuth.js setup time
- Can migrate to self-hosted Postgres anytime

**Final Pick:** PostgreSQL (Supabase for initial MVP, migrate to Railway/self-hosted as needed)

---

#### **2.4 Search: PostgreSQL Full-Text vs Elasticsearch**

**Candidates:**
- PostgreSQL Full-Text Search (native)
- Elasticsearch (dedicated search engine)
- Meilisearch (simpler ES alternative)
- Algolia (SaaS, easiest)

**Comparison:**

| Feature | PG FTS | Elasticsearch | Meilisearch | Algolia |
|---------|--------|---------------|------------|---------|
| **Search Quality** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Typo Tolerance** | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Faceted Search** | ⭐⭐⭐ | ���⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Setup Time** | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Ops Overhead** | ⭐⭐⭐⭐⭐ | ⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Cost** | 🟢 Free | 💰 Moderate | 🟢 Free | 💰 Expensive |

**✅ Recommendation: PostgreSQL Full-Text Search (MVP) → Meilisearch (Scale)**

**Why:**
1. **MVP doesn't need fancy search** = students mainly browse by subject/year
2. **FTS is "good enough"** = 80% use case covered
3. **Zero ops** = no new infrastructure
4. **Easy migration path** = Meilisearch is drop-in replacement when needed

**When to upgrade to Meilisearch:**
- 5k+ resources indexed
- Students complaining about typos (e.g., searching "cardiolgy" should find cardiology)
- Need faceted filters (Year + Subject + Type simultaneously)

**Why NOT Elasticsearch:**
- Too much ops overhead for solo dev
- Memory intensive (needs 1GB+ for small dataset)
- Deployment complexity

---

#### **2.5 Real-Time: Socket.io vs WebSockets vs Server-Sent Events**

**Candidates:**
- Socket.io (abstraction layer on WebSockets)
- Raw WebSockets
- Server-Sent Events (SSE)
- Pusher (SaaS real-time)

**Use Cases for UFAS Cortex:**
1. **Study Group chat** → needs bidirectional communication
2. **Live notifications** → admins upload resources
3. **User presence** → who's online in study group

| Feature | Socket.io | WebSocket | SSE | Pusher |
|---------|-----------|-----------|-----|--------|
| **Bidirectional** | ✅ | ✅ | ⚠️ | ✅ |
| **Fallback Support** | ✅ | ❌ | ✅ | ✅ |
| **Setup** | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Server Overhead** | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 🟢 Offloaded |
| **Dev Experience** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

**✅ Recommendation: SSE (MVP) + Socket.io (Realtime Phase)**

**Why:**
1. **SSE for notifications** = one-way push, simpler, no connection overhead
2. **Socket.io for study groups** = robust fallback, excellent DX
3. **Redis adapter** = Socket.io scales across multiple server instances
4. **No SaaS dependency** = self-hosted, full control

**Implementation Timeline:**
- **Phase 1-2**: No real-time needed
- **Phase 4-5**: Add Socket.io + Redis when study groups launch

---

#### **2.6 Authentication: NextAuth.js vs Auth0 vs Supabase Auth**

**Candidates:**
- NextAuth.js (open-source, self-hosted)
- Auth0 (enterprise, SaaS)
- Supabase Auth (PostgreSQL native)
- Firebase Auth (Google ecosystem)

| Feature | NextAuth | Auth0 | Supabase | Firebase |
|---------|----------|-------|----------|----------|
| **OAuth2 Social** | ✅ | ✅ | ✅ | ✅ |
| **Email/Password** | ✅ | ✅ | ✅ | ✅ |
| **Self-Hosted** | ✅ | ❌ | ✅ | ❌ |
| **GDPR Compliant** | ✅ | ✅ | ✅ (EU) | ⚠️ |
| **Setup Time** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Cost** | 🟢 Free | 💰💰 Expensive | 🟢 Free | 🟢 Generous Free |
| **Next.js Integration** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |

**✅ Recommendation: Supabase Auth (if using Supabase) OR NextAuth.js (if self-hosted)**

**Rationale:**
- **If MVP on Supabase**: Use their built-in Auth (JWT tokens, works with PostgreSQL)
- **If migrating off Supabase later**: Switch to NextAuth.js (same patterns, works anywhere)

**OAuth Providers for Medical Students:**
- Google (primary)
- Microsoft (university integration potential)
- GitHub (for dev students)

---

### 3. System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER (Browser)                    │
│                     Next.js React Frontend                   │
│  (Authentication, Dashboard, Resources, AI Chat, Community)  │
└─────────────────────────────────────────────────────────────┘
                              ↕
                        ┌─────────────┐
                        │  NextAuth   │
                        │   Session   │
                        │  & Cookies  │
                        └─────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────┐
│              API LAYER (Next.js /api/*)                      │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Auth Routes │  │ Resource API │  │   AI Routes  │      │
│  │  (login/reg) │  │  (CRUD ops)  │  │ (summary/    │      │
│  │              │  │              │  │  exam gen)   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Community   │  │  Favorites   │  │  Admin API   │      │
│  │  (posts/     │  │  (bookmarks) │  │  (user mgmt) │      │
│  │   comments)  │  │              │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  Middleware: Rate Limiting, CORS, Error Handling            │
└─────────────────────────────────────────────────────────────┘
           ↓              ↓              ↓              ↓
         [ORM]     [File Storage]   [Cache]      [External]
        Prisma    AWS S3/MinIO     Redis        Services
           ↓              ↓              ↓              ↓
┌──────────────────┐ ┌────────────┐ ┌────────────┐ ┌──────────┐
│  PostgreSQL DB   │ │   S3 CDN   │ │   Redis    │ │ OpenAI   │
│                  │ │            │ │   Server   │ │ API      │
│ • Users          │ │ • PDFs     │ │ • Sessions │ │ • LLM    │
│ • Resources      │ │ • Images   │ │ • Tokens   │ │ • Embeds │
│ • Subjects       │ │ • Metadata │ │ • Rate     │ │          │
│ • Community      │ │            │ │   Limits   │ │          │
└──────────────────┘ └────────────┘ └────────────┘ └──────────┘
```

---

### 4. Service Layer Separation

Despite being a monolith, organize code into clear service domains:

```
src/
├── services/
│   ├── auth/
│   │   ├── session.ts
│   │   ├── oauth.ts
│   │   └── roles.ts
│   │
│   ├── resources/
│   │   ├── upload.ts
│   │   ├── search.ts
│   │   └── download.ts
│   │
│   ├── ai/
│   │   ├── summarizer.ts
��   │   ├── examGenerator.ts
│   │   ├── flashcardCreator.ts
│   │   └── queue.ts (background jobs)
│   │
│   ├── community/
│   │   ├── posts.ts
│   │   ├── comments.ts
│   │   └── notifications.ts
│   │
│   └── admin/
│       ├── userManagement.ts
│       ├── contentModeration.ts
│       └── analytics.ts
│
├── api/
│   ├── auth/
│   ├── resources/
│   ├── ai/
│   ├── community/
│   └── admin/
│
├── lib/
│   ├── db.ts (Prisma client)
│   ├── cache.ts (Redis)
│   ├── storage.ts (S3)
│   └── openai.ts (LLM client)
│
├── middleware/
│   ├── auth.ts
│   ├── rateLimit.ts
│   └── errorHandler.ts
│
└── types/
    └── index.ts (shared TypeScript)
```

---

### 5. Data Flow Architecture

#### **Resource Upload → AI Summary Flow:**

```
1. User uploads PDF
   ↓
2. File stored in S3 (signed URL)
   ↓
3. Metadata saved to PostgreSQL (Resource record)
   ↓
4. Background job queued: ExtractText + Summarize
   ↓
5. Job worker (Next.js cron or Bull queue):
   a. Extract text from PDF
   b. Call OpenAI API for summary
   c. Store summary in DB
   d. Notify user via Redis channel
   ↓
6. User sees summary in real-time (WebSocket or polling)
```

#### **Search Query Flow:**

```
User types "cardiac pathology"
   ↓
Frontend debounces (300ms)
   ↓
API POST /api/resources/search?q=cardiac&filters={year:1,subject:cardiology}
   ↓
PostgreSQL FTS:
   SELECT * FROM resources 
   WHERE to_tsvector(title || ' ' || description) @@ plainto_tsquery('cardiac')
   AND year = 1 AND subject_id = X
   ↓
Results cached in Redis (60s)
   ↓
Return top 20 results with highlights
```

---

### 6. Deployment Architecture

**Recommended: Vercel + Railway**

```
GitHub (Main Branch)
   ↓ (auto-deploy on push)
Vercel (Frontend + API Routes)
   ├── Edge Functions (API routes in 40+ regions)
   └── Image Optimization
   
Railway (PostgreSQL + Redis)
   ├── PostgreSQL instance
   └── Redis instance
   
AWS S3 (File Storage)
   └── CloudFront CDN

OpenAI API (External)
   └── Calls from Vercel functions
```

**Cost Estimate (MVP):**
- Vercel: $0 (free tier sufficient)
- Railway PostgreSQL: $7/mo
- Railway Redis: $7/mo
- S3 storage: $0.023/GB/mo (negligible)
- OpenAI API: ~$100-500/mo (depends on AI feature usage)
- **Total: ~$15/mo + usage-based AI costs**

---

### 7. Scalability Path

| Phase | Scale | Infrastructure Changes |
|-------|-------|------------------------|
| **MVP** | 0-500 students | Vercel + Railway (works perfectly) |
| **Growth** | 500-5k | Add Redis caching layer; optimize DB queries |
| **Mid-Scale** | 5k-50k | Add Meilisearch for better search; consider Read Replicas |
| **Enterprise** | 50k+ | Self-host Kubernetes; dedicated AI inference cluster |

---

## Key Decisions Summary

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Monolith vs Microservices** | Monolith (Next.js) | Solo dev can't maintain multiple services; easier to deploy |
| **Frontend/Backend Separation** | None (full-stack) | Reduces complexity; single TypeScript codebase |
| **Database** | PostgreSQL | Relational structure fits academic domain; JSONB flexibility |
| **Search (MVP)** | PostgreSQL FTS | Zero ops; upgrade path to Meilisearch when needed |
| **Real-time** | SSE (MVP) + Socket.io (later) | Progressive enhancement; start simple |
| **Auth** | Supabase Auth or NextAuth.js | Both self-hostable; Supabase if using Supabase PG |
| **AI Integration** | OpenAI API + Queue | Industry standard; rate limiting prevents cost explosion |
| **File Storage** | AWS S3 + CDN | Scalable; handles large PDFs efficiently |
| **Deployment** | Vercel + Railway | Easiest ops burden; auto-scaling; cost-effective |

---

## Notes for Implementation

1. **Type Safety First**: Use Prisma schema to drive API design; Copilot will fill in implementations
2. **Error Handling**: Implement centralized error handler middleware (log to Sentry)
3. **Rate Limiting**: Implement early; protect AI endpoints (per-user quota)
4. **Database Migrations**: Use Prisma migrations; version control schema changes
5. **Environment Variables**: Rotate OpenAI keys regularly; use Railway secrets
6. **Monitoring**: Enable Vercel Analytics + Sentry error tracking from day 1
7. **API Documentation**: Auto-generate with OpenAPI/Swagger; use comments in code
