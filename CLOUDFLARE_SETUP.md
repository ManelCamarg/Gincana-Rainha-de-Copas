# Cloudflare Setup Guide

This guide explains how to set up the Cloudflare D1 database and Worker for the Rainha de Copas admin system.

## Prerequisites

- Node.js and npm installed
- Cloudflare account (free tier works)
- Wrangler CLI installed: `npm install -g wrangler`

## Step 1: Login to Cloudflare

```bash
wrangler login
```

This will open a browser window to authenticate with your Cloudflare account.

## Step 2: Create D1 Database

```bash
wrangler d1 create rainha-de-copas-db
```

This will output a database ID. Copy it and update `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "rainha-de-copas-db"
database_id = "YOUR_DATABASE_ID"  # Replace with the ID from the command above
```

## Step 3: Create Development Database (Optional)

```bash
wrangler d1 create rainha-de-copas-db-dev
```

Update the development section in `wrangler.toml` with the new database ID.

## Step 4: Apply Database Schema

```bash
wrangler d1 execute rainha-de-copas-db --file=database/schema.sql
```

This will create all tables and insert sample data including a default admin user.

## Step 5: Deploy Worker

```bash
wrangler deploy
```

This will deploy the Worker to Cloudflare's edge network.

## Step 6: Configure Worker URL

After deployment, Wrangler will output the Worker URL (e.g., `https://rainha-de-copas-admin.YOUR_SUBDOMAIN.workers.dev`).

Update the API base URL in `js/admin.js`:

```javascript
this.apiBaseUrl = 'https://your-worker-url.workers.dev/api';
```

## Step 7: Create First Admin User

After applying the database schema, you need to create the first admin user manually. The system uses PBKDF2 with a unique salt for each password, which is more secure than simple hashing.

### Option 1: Using a Helper Script

Create a temporary Node.js script to generate the hash and salt:

```javascript
// generate-hash.js
const crypto = require('crypto');

async function generatePasswordHash(password) {
  const salt = crypto.randomBytes(16);
  const saltHex = salt.toString('hex');
  
  const hash = crypto.pbkdf2Sync(
    password,
    salt,
    100000,
    32,
    'sha256'
  ).toString('hex');
  
  console.log('Email: your@email.com');
  console.log('Password Hash:', hash);
  console.log('Salt:', saltHex);
  console.log('');
  console.log('SQL to insert:');
  console.log(`INSERT INTO users (email, password_hash, salt) VALUES ('your@email.com', '${hash}', '${saltHex}');`);
}

generatePasswordHash('YOUR_PASSWORD');
```

Run with: `node generate-hash.js`

### Option 2: Using Wrangler CLI (Manual)

The Worker uses PBKDF2 which is not easily reproducible from CLI. Use Option 1 or the Cloudflare Dashboard method below.

### Option 3: Using Cloudflare Dashboard

Since PBKDF2 requires specific implementation details, the recommended approach is:

1. Deploy the Worker first
2. Create a temporary script to hash your password using the same logic as the Worker
3. Insert the user via the D1 Console

Replace `your@email.com` with your admin email and use the generated hash and salt from the helper script.

## Step 8: Test the Admin Panel

1. Open `admin.html` in your browser
2. Login with the email and password you created in Step 7
3. Test CRUD operations for tasks, schedule, team, lore, and announcements

## Security Notes

- The password is hashed using SHA-256 (stored in D1)
- Sessions are managed with HTTP-only, Secure, SameSite=Strict cookies
- Session IDs are stored in D1 with 24-hour expiration
- All API endpoints require valid session authentication (except login)

## Database Tables

- `users` - Admin users
- `sessions` - Session management
- `tasks` - Tasks and challenges
- `schedule` - Event schedule
- `team_members` - Team members
- `lore_story` - Story chapters
- `announcements` - Public announcements

## Local Development

To run the Worker locally:

```bash
wrangler dev
```

This will start a local development server at `http://localhost:8787`.

## Troubleshooting

### Database not found
Make sure you've created the D1 database and updated the `database_id` in `wrangler.toml`.

### CORS errors
The Worker includes CORS headers. If you still see CORS errors, check that the Worker URL is correct in `js/admin.js`.

### Login fails
Verify that the database schema was applied correctly and the default user exists in the `users` table.

### Session expiration
Sessions expire after 24 hours. This can be adjusted in the Worker code by modifying the `expiresAt` calculation.

## API Endpoints

All endpoints require authentication except `/api/login`:

- `POST /api/login` - Login (email, password)
- `POST /api/logout` - Logout
- `GET /api/tasks` - List all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/schedule` - List all events
- `POST /api/schedule` - Create event
- `PUT /api/schedule/:id` - Update event
- `DELETE /api/schedule/:id` - Delete event
- `GET /api/team` - List all team members
- `POST /api/team` - Create team member
- `PUT /api/team/:id` - Update team member
- `DELETE /api/team/:id` - Delete team member
- `GET /api/lore` - List all story chapters
- `POST /api/lore` - Create chapter
- `PUT /api/lore/:id` - Update chapter
- `DELETE /api/lore/:id` - Delete chapter
- `GET /api/announcements` - List all announcements
- `POST /api/announcements` - Create announcement
- `PUT /api/announcements/:id` - Update announcement
- `DELETE /api/announcements/:id` - Delete announcement