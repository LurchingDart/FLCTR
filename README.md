<h1 align="center">FLCTR</h1>
<p align="center">Track followers privately. See who you gained and lost.
</p>

---
A privacy-first web app that helps users track their Instagram follower history. Users upload their own CSV data exports and the app diffs new uploads against a locally stored history (via IndexedDB) to show who followed and unfollowed.

## Overview

1.  **First Visit:** User uploads their first CSV. The app parses it and saves the follower list to IndexedDB as the first snapshot.
2.  **Returning Visit:** User uploads a new CSV.
3.  **Diff:** The app loads the *previous* snapshot from IndexedDB, performs a diff against the new file, and calculates the gained and lost follower lists.
4.  **Display:** The UI updates to show the "gained" and "lost" lists, with avatars and usernames.
5.  **Save:** The new follower list is saved as the "latest" snapshot in IndexedDB.

**Future Features**

* **Username Change Detection.** (We only diff by `id`)
* **Multiple File Formats.** (Only specific CSV with format is supported).
* **Historical Charts/Graphs.**
* **Data Export/Backup.**
* **Support for official Instagram JSON.**
* **Multi-Account Support.**

>[!NOTE]
> Since Instagram doesn’t include IDs in its export, reliable diffing is impossible. Future versions will support the official export alongside the CSV, but the user assumes the risk of any inaccuracies resulting from changes made by their followers (e.g., handle, name, privacy, or account status changes)

---

## Tech Stack
- **Frontend:** React, Vite, React Router
- **Styling:** Tailwind CSS + `shadcn/ui`
- **State:** Zustand
- **Database:** IndexedDB (via `dexie.js`)
- **Parsing:** `Papa Parse`
- **Infrastructure:** Cloudflare Pages

---

## Architecture Decisions Log
| Decision        | Choice                   | Rationale                                              |
|-----------------|--------------------------|--------------------------------------------------------|
| **Framework**   | React + Vite             | Marketable, modern and keep the project lightweight.   |
| **Routing**     | React Router             | Required for `/` and `/app` routes.                    |
| **Styling**     | `shadcn/ui`              | Fastest path to a polished, custom UI.                 |
| **State**       | Zustand                  | Simpler and more performant than Context for this app. |
| **Database**    | IndexedDB via `dexie.js` | `dexie.js` provides a modern API for the browser's DB. |
| **Persistence** | Client-side only         | 100% privacy, $0 cost, no data law compliance.         |
| **File Format** | CSV (with `id` column)   | The `id` is required for reliable, accurate diffing.   |
| **Parsing**     | `Papa Parse`             | Industry-standard, fast, reliable CSV parser.          |
| **Diff Logic**  | Set-based `O(n)`         | Required for performance at 10k+ followers.            |
| **Hosting**     | Cloudflare Pages         | Free, fast, and non-Vercel.                            |

---

## Data Model

### TypeScript Interfaces
```typescript
// The clean, typed data we will store in IndexedDB
interface Follower {
  id: string;         // The unique user ID (from CSV)
  username: string;   // from userName
  fullName: string;
  profileUrl: string;
  avatarUrl: string;
  isVerified: boolean;
  followedByYou: boolean; // optional field
}

interface Profile {
  id: number;       // Hardcoded to 1
  username: string;
  lastUpload: Date;
}

interface Snapshot {
  id?: number;      // Auto-incrementing primary key
  timestamp: Date;
  followerCount: number;
  followers: Follower[]; // Stores the clean Follower[] array
}

interface Analysis {
  id?: number;      // Auto-incrementing primary key
  timestamp: Date;
  snapshotA_id: number; // Foreign key to Snapshot.id (old)
  snapshotB_id: number; // Foreign key to Snapshot.id (new)
  gained: Follower[];   // Array of new followers
  lost: Follower[];     // Array of lost followers
  gainedCount: number;
  lostCount: number;
}
```

