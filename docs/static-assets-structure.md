# Static Assets Structure & Organization Guide

## Overview

This document defines the production-ready folder structure for all static assets in UFAS Cortex, following Next.js 14+ best practices.

---

## Directory Structure

```
ufas-cortex/
├── public/                          # Next.js public directory (served at /)
│   │
│   ├── logo/                        # Brand identity
│   │   ├── logo-full.svg            # Full logo with text (preferred for landing)
│   │   ├── logo-full.png            # PNG fallback (1200x400px minimum)
│   │   ├── logo-icon.svg            # Icon only (for favicon, nav)
│   │   ├── logo-icon.png            # PNG fallback (512x512px minimum)
│   │   ├── logo-dark.svg            # Dark mode variant
│   │   ├── logo-dark.png            # Dark mode PNG
│   │   ├── favicon.ico              # Browser tab icon (32x32px)
│   │   └── apple-touch-icon.png     # iOS home screen (180x180px)
│   │
│   ├── images/                      # General purpose images
│   │   ├── landing/                 # Landing page specific
│   │   │   ├── hero-background.jpg  # Faculty of Medicine background
│   │   │   ├── hero-background-mobile.jpg  # Mobile optimized
│   │   │   ├── feature-1.webp       # Feature showcase
│   │   │   ├── feature-2.webp
│   │   │   ├── feature-3.webp
│   │   │   ├── cta-banner.jpg       # Call-to-action section
│   │   │   └── testimonial-bg.svg   # Decorative backgrounds
│   │   │
│   │   ├── onboarding/              # Auth & signup flows
│   │   │   ├── welcome-illustration.svg
│   │   │   ├── step-1.svg
│   │   │   ├── step-2.svg
│   │   │   └── step-3.svg
│   │   │
│   │   ├── illustrations/           # Reusable illustrations
│   │   │   ├── empty-state.svg      # No results state
│   │   │   ├── error-404.svg
│   │   │   ├── success.svg
│   │   │   ├── loading-spinner.svg
│   │   │   └── under-construction.svg
│   │   │
│   │   ├── avatars/                 # Default user avatars
│   │   │   ├── default-avatar.svg
│   │   │   ├── default-avatar-male.svg
│   │   │   ├── default-avatar-female.svg
│   │   │   └── placeholder.jpg      # Grayscale placeholder
│   │   │
│   │   └── social/                  # Social sharing previews
│   │       ├── og-image-default.jpg # Open Graph default
│   │       ├── og-image-landing.jpg
│   │       └── twitter-card.jpg     # Twitter preview
│   │
│   ├── icons/                       # Icon libraries & sets
│   │   ├── ui/                      # UI component icons
│   │   │   ├── arrow-right.svg
│   │   │   ├── check.svg
│   │   │   ├── close.svg
│   │   │   ├── menu.svg
│   │   │   ├── search.svg
│   │   │   ├── settings.svg
│   │   │   ├── download.svg
│   │   │   ├── upload.svg
│   │   │   ├── heart.svg
│   │   │   ├── bookmark.svg
│   │   │   ├── share.svg
│   │   │   └── more.svg
│   │   │
│   │   ├── features/                # Feature-specific icons
│   │   │   ├── ai-summary.svg
│   │   │   ├── exam-generator.svg
│   │   │   ├── flashcards.svg
│   │   │   ├── study-group.svg
│   │   │   ├── discussion.svg
│   │   │   ├── resources.svg
│   │   │   ├── favorites.svg
│   │   │   └── premium.svg
│   │   │
│   │   ├── academic/                # Academic domain icons
│   │   │   ├── subject.svg
│   │   │   ├── year-1.svg
│   │   │   ├── year-2.svg
│   │   │   ├── exam-file.svg
│   │   │   ├── notes-file.svg
│   │   │   ├── pdf.svg
│   │   │   ├── document.svg
│   │   │   └── folder.svg
│   │   │
│   │   ├── social/                  # Social media icons
│   │   │   ├── google.svg
│   │   │   ├── microsoft.svg
│   │   │   ├── github.svg
│   │   │   ├── facebook.svg
│   │   │   ├── twitter.svg
│   │   │   └── linkedin.svg
│   │   │
│   │   └── status/                  # Status indicators
│   │       ├── verified.svg
│   │       ├── premium.svg
│   │       ├── online.svg
│   │       ├── offline.svg
│   │       └── loading.svg
│   │
│   ├── backgrounds/                 # Background patterns & gradients
│   │   ├── gradient-primary.svg      # Brand gradient
│   │   ├── gradient-secondary.svg
│   │   ├── pattern-dots.svg          # Repeating patterns
│   │   ├── pattern-grid.svg
│   │   ├── pattern-waves.svg
│   │   ├── medical-hero.jpg          # Medical/academic themed
│   │   └── subtle-texture.png
│   │
│   ├── videos/                      # Video assets (if needed)
│   │   ├── landing-intro.webm       # Compressed format
│   │   └── tutorial-quick-start.webm
│   │
│   ├── fonts/                       # Self-hosted fonts (optional)
│   │   ├── inter/
│   │   │   ├── inter-regular.woff2
│   │   │   ├── inter-bold.woff2
│   │   │   └── inter-semibold.woff2
│   │   └── plus-jakarta-sans/
│   │       ├── plus-jakarta-regular.woff2
│   │       └── plus-jakarta-bold.woff2
│   │
│   ├── robots.txt                   # SEO crawlers
│   ├── sitemap.xml                  # Site structure for SEO
│   └── manifest.json                # PWA manifest
│
└── src/
    └── components/
        ├── logo/                    # Logo component (uses public/logo/*)
        │   └── Logo.tsx
        ├── images/                  # Image components (uses public/images/*)
        │   ├── HeroBackground.tsx
        │   ├── FeatureImage.tsx
        │   └── Avatar.tsx
        └── icons/                   # Icon components (uses public/icons/*)
            ├── UIIcon.tsx
            ├── FeatureIcon.tsx
            └── SocialIcon.tsx
```

---

## Asset Organization Principles

### 1. **Semantic Grouping**
Assets are organized by **purpose and context**, not by file type:
- `logo/` → Brand identity (all logo variants)
- `images/landing/` → Landing page-specific assets
- `icons/features/` → Feature-related icons
- NOT: `svg/`, `png/`, `jpg/` (difficult to maintain)

### 2. **Production-Ready Naming**
- **Descriptive**: `hero-background.jpg` (clear what it is)
- **Variant suffixes**: `-dark`, `-mobile`, `-small` for variants
- **No version numbers in filename**: Use git history instead
- **Lowercase with hyphens**: Consistent with web standards
- **Single source of truth**: One primary format + fallbacks

### 3. **Format Strategy**

| Content Type | Primary Format | Fallback | Why |
|-------------|---------------|----------|-----|
| **Logo** | SVG | PNG | Scalable; works everywhere |
| **Icons** | SVG | - | Lightweight; animatable |
| **Photography** | WebP/AVIF | JPEG | Better compression |
| **Backgrounds** | WebP/JPEG | - | Raster data; large files |
| **Illustrations** | SVG | PNG | Vector-based; small |
| **Favicons** | SVG | ICO | Modern browsers support SVG |

### 4. **Next.js Optimization**
- **Public folder** served at `https://domain.com/*`
- **Immutable**: Versioned by git; no fingerprinting needed
- **CDN-friendly**: Flat structure; no deep nesting
- **Image component**: Use `next/image` for auto-optimization

---

## File Size Guidelines

Recommended maximum sizes (post-compression):

| Asset Type | Max Size | Notes |
|-----------|----------|-------|
| **Logo SVG** | 50 KB | Usually < 20 KB |
| **Logo PNG** | 100 KB | Compressed with pngquant |
| **Hero Image JPG** | 300-500 KB | Compress with mozjpeg |
| **Hero Image WebP** | 150-250 KB | 50% smaller than JPEG |
| **Icon SVG** | 5-10 KB | Minify with SVGO |
| **Favicon** | 10 KB | Use SVG or optimized ICO |
| **OG Image JPG** | 200 KB | For social sharing |

---

## Implementation: Component Wrappers

### Logo Component (`src/components/logo/Logo.tsx`)

```typescript
import Image from 'next/image';
import { FC } from 'react';

interface LogoProps {
  variant?: 'full' | 'icon';
  size?: 'small' | 'medium' | 'large';
  darkMode?: boolean;
  className?: string;
}

export const Logo: FC<LogoProps> = ({
  variant = 'full',
  size = 'medium',
  darkMode = false,
  className = '',
}) => {
  const sizes = {
    small: { width: 32, height: 32 },
    medium: { width: 64, height: 64 },
    large: { width: 128, height: 128 },
  };

  const getLogoPath = () => {
    if (variant === 'icon') {
      return `/logo/logo-icon${darkMode ? '-dark' : ''}.svg`;
    }
    return `/logo/logo-full${darkMode ? '-dark' : ''}.svg`;
  };

  const { width, height } = sizes[size];

  return (
    <Image
      src={getLogoPath()}
      alt="UFAS Cortex Logo"
      width={width}
      height={height}
      priority
      className={className}
    />
  );
};
```

### Hero Background Component (`src/components/images/HeroBackground.tsx`)

```typescript
import Image from 'next/image';
import { FC } from 'react';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';

interface HeroBackgroundProps {
  alt?: string;
  className?: string;
}

export const HeroBackground: FC<HeroBackgroundProps> = ({
  alt = 'Faculty of Medicine Background',
  className = '',
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className={`relative w-full h-screen overflow-hidden ${className}`}>
      <Image
        src={
          isMobile
            ? '/images/landing/hero-background-mobile.jpg'
            : '/images/landing/hero-background.jpg'
        }
        alt={alt}
        fill
        priority
        quality={85}
        sizes="100vw"
        className="object-cover"
      />
      {/* Optional overlay for text readability */}
      <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
    </div>
  );
};
```

### Icon Component (`src/components/icons/UIIcon.tsx`)

```typescript
import Image from 'next/image';
import { FC } from 'react';

interface IconProps {
  name: string; // e.g., 'search', 'menu', 'check'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'ui' | 'feature' | 'academic' | 'social' | 'status';
  className?: string;
  title?: string;
}

const sizeMap = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 48,
};

export const UIIcon: FC<IconProps> = ({
  name,
  size = 'md',
  variant = 'ui',
  className = '',
  title,
}) => {
  const dimension = sizeMap[size];

  return (
    <Image
      src={`/icons/${variant}/${name}.svg`}
      alt={title || name}
      width={dimension}
      height={dimension}
      className={className}
    />
  );
};
```

---

## Meta Tags & SEO Setup

### Favicon Setup (`next.config.js`)

```javascript
module.exports = {
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [], // Add S3 domain if using remote storage
  },
};
```

### Layout Configuration (`app/layout.tsx`)

```typescript
import type { Metadata } from 'next';
import { Logo } from '@/components/logo/Logo';

export const metadata: Metadata = {
  title: 'UFAS Cortex - Learn More, Stress Less',
  description: 'Modern educational platform for medical students',
  icons: {
    icon: '/logo/favicon.ico',
    apple: '/logo/apple-touch-icon.png',
  },
  openGraph: {
    images: ['/images/social/og-image-default.jpg'],
  },
};
```

---

## Asset Delivery Strategy

### CDN & Performance

```
                ┌─────────────────────┐
                │   GitHub (repo)     │
                │   public/assets/    │
                └──────────┬──────────┘
                           │
                ┌──────────▼───────────┐
                │ Vercel Edge Network  │
                ��� (CDN) Auto-deployed  │
                └──────────┬───────────┘
                           │
                ┌──────────▼──────────┐
                │  User's Browser     │
                │  (cached 1 year)    │
                └─────────────────────┘
```

**Headers for static assets** (`vercel.json`):
```json
{
  "headers": [
    {
      "source": "/logo/:path*",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/images/:path*",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## Next.js Image Optimization Example

### Landing Page Usage

```typescript
// app/page.tsx
import Image from 'next/image';
import { Logo } from '@/components/logo/Logo';
import { HeroBackground } from '@/components/images/HeroBackground';

export default function LandingPage() {
  return (
    <>
      {/* Logo in navbar */}
      <nav className="flex items-center gap-2">
        <Logo variant="icon" size="small" />
        <span className="font-bold">UFAS Cortex</span>
      </nav>

      {/* Hero section with background */}
      <HeroBackground />

      {/* Feature images with WebP + JPEG fallback */}
      <div className="grid grid-cols-3 gap-4">
        <Image
          src="/images/landing/feature-1.webp"
          alt="Feature 1"
          width={400}
          height={300}
          quality={80}
        />
        {/* Next.js automatically serves WebP to modern browsers, JPEG to older ones */}
      </div>
    </>
  );
}
```

---

## Migration Checklist

- [ ] Create public folder structure as defined above
- [ ] Add logo files (SVG + PNG variants)
- [ ] Add hero background (mobile + desktop)
- [ ] Create icon library (UI, features, academic, social)
- [ ] Add illustration assets (empty states, errors)
- [ ] Create component wrappers (Logo.tsx, HeroBackground.tsx, UIIcon.tsx)
- [ ] Configure next.config.js for image optimization
- [ ] Set up metadata in layout.tsx (favicon, OG images)
- [ ] Add vercel.json with cache headers
- [ ] Update .gitignore if needed (usually not needed for public/)
- [ ] Test CDN delivery and caching
- [ ] Optimize all images with:
  - SVGO (for SVGs)
  - pngquant (for PNGs)
  - mozjpeg (for JPEGs)
  - cwebp (generate WebP variants)

---

## Tools for Asset Optimization

```bash
# SVG optimization
npm install -g svgo
svgo logo.svg --output logo.min.svg

# Image compression
npm install -g imagemin-cli imagemin-mozjpeg imagemin-pngquant imagemin-webp
imagemin public/images --out-dir=public/images
cwebp -q 80 image.jpg -o image.webp

# Batch processing
for file in public/images/**/*.jpg; do
  cwebp -q 75 "$file" -o "${file%.jpg}.webp"
done
```

---

## Why This Structure?

### ✅ Benefits of This Organization

1. **Maintainability**: Related assets grouped by purpose, not type
2. **Scalability**: Easy to add new categories (e.g., `icons/admin/`, `images/dashboard/`)
3. **Performance**: Clear variants (mobile, dark mode) for responsive/theming
4. **SEO**: Organized for easy metadata setup
5. **DX**: Component wrappers hide asset paths; easy to refactor
6. **CDN-friendly**: Flat paths; works with any CDN
7. **Git-friendly**: Public folder tracked; no image data bloat
8. **Production-ready**: No placeholder/temp folders; everything purposeful

### ❌ What We Avoided

- ❌ `assets/`, `static/` (ambiguous names)
- ❌ `images/`, `svg/`, `png/` (organization by type, not purpose)
- ❌ `/img/`, `src/assets/` (old conventions; moved out of src/)
- ❌ Unversioned directories
- ❌ Deep nesting (>3 levels)
- ❌ Inline asset data in code

---

## Future Enhancements

1. **Image Sprites**: If icon count grows > 50
2. **SVG Symbol Library**: Reusable SVG symbols via `<use>` tags
3. **Dark Mode Assets**: Organized by theme
4. **Internationalization**: Flag assets for language support
5. **A/B Testing**: Alternative hero images for conversion testing
6. **Remote Asset Storage**: S3 integration for user-uploaded content (separate from public/)

