# Premium Model

## Overview

UFAS Cortex uses an activation code system for premium access. Standard educational resources are free for all registered students, while AI-powered features require an active premium subscription.

---

## Feature Matrix

### Free Tier (All Students)

| Feature | Access | Notes |
|---------|--------|-------|
| Browse resources | Yes | All years and subjects |
| Download PDFs | Yes | Unlimited downloads |
| View resources online | Yes | PDF viewer included |
| Bookmarks/Favorites | Yes | Save resources |
| Download history | Yes | Track downloads |
| Community posts | Yes | Discussions and comments |
| Study groups | Yes | Create and join |

### Premium Tier (Activation Code Required)

| Feature | Access | Notes |
|---------|--------|-------|
| AI Summaries | Yes | Generate summaries for any resource |
| AI Exam Generator | Yes | Create custom MCQ exams |
| AI Flashcards | Yes | Auto-generate flashcard decks |
| AI Medical Chatbot | Yes | Future feature |
| Priority support | Yes | Faster response time |
| Early access | Yes | New features first |

---

## Activation Code System

### Code Generation

Admins generate activation codes through the admin dashboard.

| Property | Description |
|----------|-------------|
| Code format | `CORTEX-XXXX-XXXX-XXXX` (16 characters) |
| Length | Configurable (default 16) |
| Quantity | Batch generation available |
| Expiry | Configurable per batch |
| Single use | One code per user |
| Tracking | All redemptions logged |

### Code Properties

```typescript
interface ActivationCode {
  id: string;
  code: string;                    // Unique code string
  duration_days: number;           // Subscription duration
  max_uses: number;                // Always 1 (single use)
  current_uses: number;            // 0 or 1
  expires_at: Date | null;         // Code expiry (optional)
  created_by: string;              // Admin user ID
  created_at: Date;
  used_by: string | null;          // User who redeemed
  used_at: Date | null;            // Redemption timestamp
  is_active: boolean;              // Can be disabled by admin
}
```

### Subscription Properties

```typescript
interface PremiumSubscription {
  id: string;
  user_id: string;
  activated_at: Date;
  expires_at: Date;                // activated_at + duration_days
  activation_code_id: string;
  is_active: boolean;              // Computed: expires_at > now
  created_at: Date;
  updated_at: Date;
}
```

---

## Pricing Configuration

Pricing is fully configurable through the admin dashboard.

### Configurable Values

| Setting | Default | Description |
|---------|---------|-------------|
| Monthly equivalent | $9.99 | Display price for monthly |
| 3-month duration | 90 days | Common activation period |
| 6-month duration | 180 days | Semester-based |
| 12-month duration | 365 days | Full year access |
| Trial duration | 0 days | No free trial by default |

### Price Display

The platform displays pricing for informational purposes. Actual payment:
- Not integrated with payment processor
- Activation codes distributed through:
  - University partnerships
  - Promotional campaigns
  - Direct sales (external)

---

## Quota Management

### AI Feature Limits

Quotas prevent abuse and control API costs.

| Feature | Free Quota | Premium Quota | Notes |
|---------|------------|---------------|-------|
| AI Summaries | 0 | 50/month | Reset monthly |
| AI Exams | 0 | 30/month | Per user |
| AI Flashcards | 0 | 20/month | Per user |
| Summary length | N/A | 2000 tokens | Max output |

### Quota Tracking

```typescript
interface QuotaUsage {
  user_id: string;
  feature: 'summary' | 'exam' | 'flashcard';
  used: number;
  limit: number;
  period_start: Date;
  period_end: Date;
}
```

### Grace Period

- 3-day grace after subscription expiry
- Existing AI content remains accessible
- New generation blocked after grace

---

## Implementation

### Premium Check Flow

```
1. User requests AI feature
   ↓
2. Check user.subscription.is_active
   ↓
3. If inactive, show upgrade prompt
   ↓
4. If active, check quota
   ↓
5. If quota exceeded, show limit message
   ↓
6. If quota available, process request
   ↓
7. Increment quota usage
```

### Activation Flow

```
1. User navigates to Premium page
   ↓
2. User enters activation code
   ↓
3. Validate code:
   - Code exists
   - Code is active
   - Code not expired
   - Code not used
   ↓
4. Create subscription record
   ↓
5. Mark code as used
   ↓
6. Update user premium status
   ↓
7. Show success confirmation
```

---

## Database Schema

### Activation Codes Table

```sql
CREATE TABLE activation_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(20) UNIQUE NOT NULL,
  duration_days INTEGER NOT NULL DEFAULT 90,
  max_uses INTEGER DEFAULT 1,
  current_uses INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  used_by UUID REFERENCES auth.users(id),
  used_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true
);
```

### Premium Subscriptions Table

```sql
CREATE TABLE premium_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) UNIQUE,
  activated_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  activation_code_id UUID REFERENCES activation_codes(id),
  is_active BOOLEAN GENERATED ALWAYS AS (expires_at > NOW()) STORED,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Admin Management

### Code Generation UI

Admin dashboard provides:
- Batch code generation (10, 50, 100, 500)
- Duration selection (30, 90, 180, 365 days)
- Optional expiry date
- Export codes to CSV
- View redemption history

### Code Management

- View all generated codes
- Disable unused codes
- View usage statistics
- Search and filter codes

### Subscription Management

- View all active subscriptions
- Extend subscription manually
- Revoke subscription (admin action)
- View subscription history per user

---

## Future Enhancements

### Planned Features

1. **Payment Integration**: Stripe/Razorpay integration
2. **Gift Codes**: Transferable activation codes
3. **Family Plans**: Multiple users per code
4. **Referral Program**: Earn premium time
5. **Loyalty Rewards**: Free premium for active users

### Analytics Tracking

- Conversion rate (free to premium)
- Code redemption rate
- Average subscription duration
- Feature usage by premium users
- Churn rate analysis
