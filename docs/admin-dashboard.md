# Admin Dashboard

This document describes the admin dashboard features and workflows.

---

## Overview

Admin users have full control over:
- User management (view, manage premium status)
- Resource management (upload, edit, archive, delete)
- Academic structure (years, semesters, subjects)
- Premium system (activation codes, subscriptions)
- Platform analytics and settings

---

## Admin Access

### Admin Role Assignment

Admin users are created through:
1. Database insertion by existing admin
2. Supabase dashboard manual update
3. Migration script (initial setup)

### Admin Authentication

- Standard login (email/password or OAuth)
- Additional verification not required
- Session timeout: 8 hours (configurable)
- All admin actions logged for audit

---

## Admin Dashboard Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  LOGO    UFAS Cortex Admin          [Search...]    [Admin ▼]    │
├──────────────┬──────────────────────────────────────────────────┤
│              │                                                   │
│  Dashboard   │   [Admin Dashboard Content Area]                │
│              │                                                   │
│  Users       │                                                   │
│              │                                                   │
│  Resources   │                                                   │
│  ├── Upload  │                                                   │
│  └── Manage  │                                                   │
│              │                                                   │
│  Academic    │                                                   │
│  ├── Years   │                                                   │
│  └── Subjects│                                                   │
│              │                                                   │
│  Premium     │                                                   │
│  ├── Codes   │                                                   │
│  └── Settings│                                                   │
│              │                                                   │
│  Analytics   │                                                   │
│              │                                                   │
│  Reports     │                                                   │
│              │                                                   │
└──────────────┴───────────────────────────────────────────────────┘
```

---

## Admin Dashboard Home

```
┌─────────────────────────────────────────────────────────────────┐
│                    ADMIN DASHBOARD                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │  1,234   │  │   567    │  │  89      │  │   45     │       │
│  │  Users   │  │ Resources│  │ Premium  │  │ Pending  │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│                                                                  │
│  Recent Activity                                                │
│  ├─ User registered: ahmed@univ.dz (2 min ago)                 │
│  ├─ Resource uploaded: Anatomy Exam 2024 (15 min ago)          │
│  ├─ Premium activated: CORTEX-XXXX (1 hour ago)                │
│  └─ ...                                                        │
│                                                                  │
│  Quick Actions                                                  │
│  [Upload Resource]  [Generate Codes]  [View Reports]           │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## User Management

### User List Page

```
┌─────────────────────────────────────────────────────────────────┐
│                       USERS                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Search: [________]  Filter: [All Users ▼]  [Export CSV]       │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ ID   │ Name       │ Email          │ Year │ Premium │Actions││
│  ├──────┼────────────┼────────────────┼──────┼─────────┼───────┤│
│  │ 001  │ Ahmed Ben  │ ahmed@...      │ Y3   │ Active  │ [View]││
│  │ 002  │ Fatima Z   │ fatima@...     │ Y2   │ Expired │ [View]││
│  │ 003  │ Omar K     │ omar@...       │ Y1   │ None    │ [View]││
│  │ ...  │ ...        │ ...            │ ...  │ ...     │ ...   ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                  │
│  [◀ Prev]  Page 1 of 10  [Next ▶]                              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### User Detail Modal

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER DETAILS                              [X]│
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Name: Ahmed Ben Ali                                           │
│  Email: ahmed.benali@univ-setif.dz                             │
│  Academic Year: Year 3                                         │
│  Joined: September 15, 2026                                    │
│                                                                  │
│  Premium Status: ✅ Active                                      │
│  Activated: October 1, 2026                                    │
│  Expires: January 1, 2027                                       │
│  Code: CORTEX-ABCD-EFGH-IJKL                                   │
│                                                                  │
│  Activity Summary                                               │
│  ├── Downloads: 45 resources                                   │
│  ├── Favorites: 12 resources                                   │
│  ├── AI Summaries: 23 generated                                │
│  └── Last active: 2 hours ago                                  │
│                                                                  │
│  Actions                                                        │
│  [Extend Premium]  [View Full Activity]  [Suspend User]        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Admin Actions (Users)

| Action | Description | Confirmation Required |
|--------|-------------|---------------------|
| View details | View user profile and activity | No |
| Extend premium | Add days to subscription | Yes |
| Revoke premium | Remove premium access | Yes |
| Suspend user | Temporarily disable account | Yes |
| Delete user | Permanently remove account | Yes (double) |
| Export data | Download user's data | No |

---

## Resource Management

### Resource List Page

```
┌─────────────────────────────────────────────────────────────────┐
│                     RESOURCES                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  [Upload Resource]  Search: [________]  Filter: [All Types ▼] │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ Title         │ Subject  │ Type  │ Downloads │ Actions    ││
│  ├───────────────┼──────────┼───────┼───────────┼────────────┤│
│  │ Anatomy 2023  │ Anatomy  │ Exam  │ 156       │ [Edit][Del]││
│  │ Notes Week 5  │ Anatomy  │ Notes │ 89        │ [Edit][Del]││
│  │ Lab Manual    │ Histology│ Lab   │ 234       │ [Edit][Del]││
│  │ ...           │ ...      │ ...   │ ...       │ ...        ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                  │
│  [◀ Prev]  Page 1 of 25  [Next ▶]                              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Upload Resource Page

```
┌─────────────────────────────────────────────────────────────────┐
│                   UPLOAD RESOURCE                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Academic Year: [Select Year ▼]                                │
│  Semester: [Select Semester ▼]                                 │
│  Subject: [Select Subject ▼]                                   │
│                                                                  │
│  Title: [________________________________]                      │
│                                                                  │
│  Type: ○ Previous Exam  ○ Lecture Notes  ○ Practical File     │
│        ○ Drive Link    ○ Other                                  │
│                                                                  │
│  Description (optional):                                        │
│  [______________________________________________]               │
│  [______________________________________________]               │
│                                                                  │
│  File:                                                          │
│  ┌──────────────────────────────────────────────────┐           │
│  │     📄 Drop PDF here or click to browse         │           │
│  │           Maximum file size: 50MB              │           │
│  └──────────────────────────────────────────────────┘           │
│                                                                  │
│  [Cancel]                                [Upload Resource]      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Edit Resource Modal

```
┌─────────────────────────────────────────────────────────────────┐
│                    EDIT RESOURCE                            [X] │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Title: [Anatomy Exam 2023_______________]                     │
│  Subject: [Anatomy ▼]                                          │
│  Type: [Previous Exam ▼]                                       │
│                                                                  │
│  Description:                                                   │
│  [Final exam from 2023 academic year____]                      │
│                                                                  │
│  Current File: anatomy-2023.pdf (2.4 MB)                       │
│  [Replace File]                                                 │
│                                                                  │
│  Status: ○ Active  ○ Archived                                  │
│                                                                  │
│  [Cancel]                              [Save Changes]          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Admin Actions (Resources)

| Action | Description | Affected Data |
|--------|-------------|---------------|
| Upload | Add new resource | Creates resource record + file |
| Edit | Modify metadata | Updates resource fields |
| Replace file | Update PDF file | Replaces storage file |
| Archive | Hide from students | Sets is_archived = true |
| Delete | Permanently remove | Deletes record + file + AI content |

---

## Academic Structure Management

### Years Management

```
┌─────────────────────────────────────────────────────────────────┐
│                   ACADEMIC YEARS                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  [+ Add Year]                                                   │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ Year            │ Semester │ Subjects │ Resources │ Actions││
│  ├─────────────────┼──────────┼──────────┼───────────┼────────┤│
│  │ First Year      │ S1, S2   │ 12       │ 45        │ [Edit] ││
│  │ Second Year     │ U1-U7    │ 10       │ 67        │ [Edit] ││
│  │ Third Year      │ UEI 1-4  │ 14       │ 89        │ [Edit] ││
│  │ Fourth Year     │ (empty)  │ 0        │ 0         │ [Edit] ││
│  │ Fifth Year      │ (empty)  │ 0        │ 0         │ [Edit] ││
│  │ Sixth Year      │ (empty)  │ 0        │ 0         │ [Edit] ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Subject Management

```
┌─────────────────────────────────────────────────────────────────┐
│              SUBJECTS - First Year                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  [+ Add Subject]                                                │
│                                                                  │
│  Semester: [S1 ▼] [S2 ▼] [All ▼]                               │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ Subject       │ Semester │ Resources │ Actions             ││
│  ├───────────────┼──────────┼───────────┼─────────────────────┤│
│  │ Anatomy       │ S1, S2   │ 23        │ [Edit] [Archive]    ││
│  │ Cytology      │ S1       │ 12        │ [Edit] [Archive]    ││
│  │ Chemistry     │ S1, S2   │ 15        │ [Edit] [Archive]    ││
│  │ Biochemistry  │ S1, S2   │ 18        │ [Edit] [Archive]    ││
│  │ ...           │ ...      │ ...       │ ...                 ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Premium Code Management

### Code List Page

```
┌─────────────────────────────────────────────────────────────────┐
│                   ACTIVATION CODES                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  [Generate New Codes]                                          │
│                                                                  │
│  Filter: [All ▼] [Unused ▼] [Used ▼] [Expired ▼]              │
│  [Export CSV]                                                   │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ Code                  │ Duration │ Status  │ Used By  │ Date ││
│  ├───────────────────────┼──────────┼─────────┼──────────┼──────┤│
│  │ CORTEX-ABCD-EFGH-1234 │ 90 days  │ Used    │ Ahmed B. │ Oct  ││
│  │ CORTEX-IJKL-MNOP-5678 │ 90 days  │ Unused  │ -        │ -    ││
│  │ CORTEX-QRST-UVWX-9012 │ 180 days│ Expired │ -        │ -    ││
│  │ ...                   │ ...      │ ...     │ ...      │ ...  ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                  │
│  Statistics:                                                    │
│  ├── Total codes: 500                                          │
│  ├── Used: 234 (46.8%)                                         │
│  ├── Unused: 250 (50.0%)                                       │
│  └── Expired: 16 (3.2%)                                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Generate Codes Page

```
┌─────────────────────────────────────────────────────────────────┐
│                  GENERATE CODES                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Number of codes: [50 ▼]                                        │
│                                                                  │
│  Duration:                                                       │
│  ○ 30 days (1 month)                                           │
│  ● 90 days (3 months)                                          │
│  ○ 180 days (6 months)                                         │
│  ○ 365 days (12 months)                                        │
│                                                                  │
│  Expiry date (optional): [________________] [Clear]            │
│  (Codes must be used before this date)                         │
│                                                                  │
│  Notes (internal):                                              │
│  [Batch for Faculty of Medicine promotion_______]              │
│                                                                  │
│  [Cancel]                                [Generate 50 Codes]   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Code Generation Result

```
┌─────────────────────────────────────────────────────────────────┐
│                   CODES GENERATED                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ✅ Successfully generated 50 activation codes                 │
│                                                                  │
│  Duration: 90 days                                              │
│  Created: July 8, 2026                                          │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ CORTEX-IJKL-MNOP-5678                                      ││
│  │ CORTEX-QRST-UVWX-9012                                      ││
│  │ CORTEX-EFGH-ABCD-3456                                      ││
│  │ ... (47 more)                                              ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                  │
│  [Copy All]  [Download CSV]  [Generate More]                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Premium Settings

```
┌─────────────────────────────────────────────────────────────────┐
│                   PREMIUM SETTINGS                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Pricing Display (informational only)                          │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ Monthly equivalent: [$9.99_____]                           ││
│  │ 3-month plan:       [$24.99____]                           ││
│  │ 6-month plan:       [$44.99____]                           ││
│  │ Annual plan:        [$79.99____]                           ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                  │
│  AI Feature Quotas (per user per month)                        │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ AI Summaries:  [50___] generations                         ││
│  │ AI Exams:       [30___] generations                         ││
│  │ AI Flashcards: [20___] generations                         ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                  │
│  Summary Settings                                               │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ Max summary length: [2000___] tokens                      ││
│  │ Summary language: [English ▼]                              ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                  │
│  [Save Settings]                                                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Analytics Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│                      ANALYTICS                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Time Range: [Last 30 days ▼]                                  │
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │  1,234   │  │  5,678   │  │   89     │  │ $1,234   │       │
│  │New Users │  │Downloads │  │ Premium  │  │ Est. Rev │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│                                                                  │
│  User Growth Chart                                              │
│  ┌────────────────────────────────────────────────────────────┐│
│  │     ▁▂▃▄▅▆▇█▇▆▅▄▃▂▁                                     ││
│  │     Weekly user registrations over time                    ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                  │
│  Top Resources                                                  │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ #  │ Resource                        │ Downloads           ││
│  ├────┼─────────────────────────────────┼─────────────────────┤│
│  │ 1  │ Anatomy Exam 2023               │ 234                 ││
│  │ 2  │ Physiology Notes Complete       │ 198                 ││
│  │ 3  │ Biochemistry Quick Review       │ 167                 ││
│  │ 4  │ Histology Lab Manual            │ 145                 ││
│  │ 5  │ First Aid Guidelines            │ 132                 ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                  │
│  AI Feature Usage                                               │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ Feature       │ Generations │ Avg Processing Time          ││
│  ├───────────────┼─────────────┼─────────────────────────────┤│
│  │ Summaries     │ 1,234       │ 12.3s                       ││
│  │ Exams         │ 567         │ 25.6s                       ││
│  │ Flashcards    │ 890         │ 8.9s                        ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                  │
│  [Export Report]                                               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Audit Logging

All admin actions are logged with:

| Field | Description |
|-------|-------------|
| admin_id | User who performed action |
| action | Type of action performed |
| target_type | Resource, User, Code, etc. |
| target_id | ID of affected entity |
| details | JSON with action details |
| ip_address | Request IP |
| created_at | Timestamp |

### Logged Actions

- User management (view, extend, revoke, suspend, delete)
- Resource management (upload, edit, archive, delete)
- Code management (generate, disable)
- Settings changes
- Admin role assignment
