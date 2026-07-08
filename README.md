# UFAS Cortex

**Learn More. Stress Less.**

A modern educational platform designed exclusively for medical students at the Faculty of Medicine, University Ferhat Abbas Setif 1.

## Overview

UFAS Cortex centralizes all academic resources in one place, including previous exams, lecture notes, summaries, and AI-powered study tools.

## Features

### Free for All Students
- Browse resources by year, semester, and subject
- Download PDFs
- View resources online
- Bookmarks/Favorites
- Community discussions

### Premium (Activation Code Required)
- AI Summaries - Generate intelligent summaries for any PDF
- AI Exam Generator - Create custom MCQ practice exams
- AI Flashcards - Auto-generate flashcard decks

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (Supabase)
- **Auth:** Supabase Auth
- **Storage:** Supabase Storage
- **AI:** OpenAI API

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/ufas-cortex.git
cd ufas-cortex

# Install dependencies
npm install

# Copy environment template
cp .env.local.example .env.local

# Configure environment variables in .env.local
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - OPENAI_API_KEY

# Start development server
npm run dev
```

### Environment Variables

See `.env.local.example` for all required variables.

## Project Structure

```
ufas-cortex/
├── docs/                    # Documentation
├── public/                   # Static assets
├── src/
│   ├── app/                  # Next.js App Router pages
│   ├── components/           # React components
│   │   ├── ui/              # UI primitives
│   │   └── layout/          # Layout components
│   ├── lib/                  # Utilities and clients
│   │   ├── supabase/        # Supabase client
│   │   └── utils/           # Utilities
│   └── types/               # TypeScript types
└── supabase/                 # Database migrations
```

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Type check
npm run type-check

# Format code
npm run format
```

## Documentation

- [Architecture](docs/architecture.md) - Technical decisions and rationale
- [Database Schema](docs/database.md) - Complete database structure
- [API Design](docs/api-design.md) - REST endpoint documentation
- [User Flows](docs/user-flows.md) - User journey wireframes
- [Premium Model](docs/premium-model.md) - Activation codes and billing
- [Security](docs/security.md) - Authentication and data protection
- [Admin Dashboard](docs/admin-dashboard.md) - Admin functionality

## Contributing

This is a private project for the Faculty of Medicine. Contact the maintainers for contribution guidelines.

## License

Proprietary. All rights reserved.

## Contact

Faculty of Medicine, University Ferhat Abbas Setif 1

---

**Mission:** Learn More. Stress Less.
