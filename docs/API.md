# API Documentation

Complete reference for Semzung API endpoints.

## 📋 Base URL

```
http://localhost:5002/api
```

## 🔐 Authentication

All protected endpoints require JWT token in header:

```bash
Authorization: Bearer <your_jwt_token>
```

## 📊 Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": []
}
```

## 👤 Auth Endpoints

### Register

**POST** `/auth/register`

Create new user account.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "userId",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Errors:**
- 400: Email already registered
- 400: Validation error

---

### Login

**POST** `/auth/login`

Authenticate user and get JWT token.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "userId",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Errors:**
- 401: Invalid credentials
- 429: Too many login attempts

---

### Get Current User

**GET** `/auth/me` (Protected)

Get authenticated user details.

**Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "userId",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "bio": "Student passionate about mental health",
    "avatar": "https://...",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

**Errors:**
- 401: No token provided or invalid token

---

### Update Profile

**PUT** `/auth/profile` (Protected)

Update user profile information.

**Request:**
```json
{
  "name": "John Updated",
  "bio": "New bio",
  "avatar": "https://example.com/avatar.jpg"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {...}
}
```

---

## 📝 Post Endpoints

### Get All Posts

**GET** `/posts`

Retrieve community posts (paginated).

**Query Parameters:**
- `category`: Filter by category (anxiety, depression, stress, motivation, general)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

**Example:**
```bash
GET /posts?category=anxiety&page=1&limit=5
```

**Response (200):**
```json
{
  "success": true,
  "posts": [
    {
      "_id": "postId",
      "title": "Feeling overwhelmed",
      "content": "Post content...",
      "category": "anxiety",
      "author": {
        "_id": "userId",
        "name": "Anonymous"
      },
      "isAnonymous": true,
      "likes": 12,
      "comments": 3,
      "status": "active",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 45,
    "page": 1,
    "pages": 9
  }
}
```

---

### Get Single Post

**GET** `/posts/:id`

Get specific post details.

**Response (200):**
```json
{
  "success": true,
  "post": {...}
}
```

**Errors:**
- 404: Post not found

---

### Create Post

**POST** `/posts` (Protected)

Create new anonymous post.

**Request:**
```json
{
  "title": "Feeling stressed about exams",
  "content": "Long post content describing the situation...",
  "category": "stress",
  "isAnonymous": true
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Post created successfully",
  "post": {...}
}
```

**Errors:**
- 400: Validation error
- 401: Not authenticated

---

### Delete Post

**DELETE** `/posts/:id` (Protected)

Delete own post (or admin can delete any).

**Response (200):**
```json
{
  "success": true,
  "message": "Post deleted successfully"
}
```

**Errors:**
- 403: Not authorized
- 404: Post not found

---

## 😊 Mood Endpoints

### Add Mood Entry

**POST** `/mood` (Protected)

Log daily mood.

**Request:**
```json
{
  "mood": "good",
  "intensity": 7,
  "note": "Had a productive day",
  "triggers": ["stress", "work"],
  "activities": ["exercise", "meditation"]
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Mood logged successfully",
  "moodLog": {
    "_id": "moodId",
    "user": "userId",
    "mood": "good",
    "intensity": 7,
    "note": "Had a productive day",
    "triggers": ["stress", "work"],
    "activities": ["exercise", "meditation"],
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### Get Mood History

**GET** `/mood/history` (Protected)

Get user's mood entries.

**Query Parameters:**
- `days`: Number of days to retrieve (default: 7)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

**Response (200):**
```json
{
  "success": true,
  "moodLogs": [...],
  "pagination": {
    "total": 21,
    "page": 1,
    "pages": 3
  }
}
```

---

### Get Mood Statistics

**GET** `/mood/stats` (Protected)

Get mood statistics for period.

**Query Parameters:**
- `days`: Days to analyze (default: 30)

**Response (200):**
```json
{
  "success": true,
  "stats": [
    {
      "_id": "good",
      "count": 15,
      "avgIntensity": 7.3
    },
    {
      "_id": "okay",
      "count": 10,
      "avgIntensity": 5.1
    },
    {
      "_id": "bad",
      "count": 5,
      "avgIntensity": 3.2
    }
  ]
}
```

---

## 📚 Journal Endpoints

### Create Journal Entry

**POST** `/journal` (Protected)

Write new journal entry.

**Request:**
```json
{
  "title": "Today's Thoughts",
  "content": "Long personal journal entry...",
  "mood": "good",
  "tags": ["reflection", "personal-growth"],
  "isPrivate": true
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Journal entry created successfully",
  "journal": {...}
}
```

---

### Get User's Journals

**GET** `/journal` (Protected)

Retrieve all user's journal entries.

**Query Parameters:**
- `page`: Page number
- `limit`: Items per page

**Response (200):**
```json
{
  "success": true,
  "journals": [...],
  "pagination": {...}
}
```

---

### Get Single Journal

**GET** `/journal/:id` (Protected)

Get specific journal entry.

**Response (200):**
```json
{
  "success": true,
  "journal": {...}
}
```

---

### Update Journal

**PUT** `/journal/:id` (Protected)

Update journal entry.

**Request:**
```json
{
  "title": "Updated Title",
  "content": "Updated content...",
  "mood": "excellent"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Journal entry updated successfully",
  "journal": {...}
}
```

---

### Delete Journal

**DELETE** `/journal/:id` (Protected)

Delete journal entry.

**Response (200):**
```json
{
  "success": true,
  "message": "Journal entry deleted successfully"
}
```

---

## 👨‍💼 Admin Endpoints

### Get All Users

**GET** `/admin/users` (Admin Only)

List all users.

**Query Parameters:**
- `page`: Page number
- `limit`: Items per page

**Response (200):**
```json
{
  "success": true,
  "users": [
    {
      "_id": "userId",
      "name": "User Name",
      "email": "user@example.com",
      "role": "user",
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {...}
}
```

---

### Delete Post (Admin)

**DELETE** `/admin/post/:id` (Admin Only)

Remove inappropriate post.

**Response (200):**
```json
{
  "success": true,
  "message": "Post deleted by admin"
}
```

---

### Flag Post

**PUT** `/admin/post/:id/flag` (Admin Only)

Flag post for review.

**Request:**
```json
{
  "reason": "Inappropriate content"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Post flagged for review",
  "post": {...}
}
```

---

### Get Dashboard Stats

**GET** `/admin/dashboard` (Admin Only)

Get system statistics.

**Response (200):**
```json
{
  "success": true,
  "stats": {
    "totalUsers": 142,
    "totalPosts": 487,
    "flaggedPosts": 12,
    "recentUsers": [...]
  }
}
```

---

## 🔍 Error Codes

| Code | Message | Meaning |
|------|---------|---------|
| 200 | OK | Request successful |
| 201 | Created | Resource created |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | No/invalid token |
| 403 | Forbidden | No permission |
| 404 | Not Found | Resource not found |
| 429 | Too Many Requests | Rate limited |
| 500 | Server Error | Internal error |

---

## 🔄 Rate Limiting

Default limits:
- **General endpoints**: 100 requests per 15 minutes
- **Auth endpoints**: 5 requests per 15 minutes

Response headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1610714400
```

---

## 📝 Validation Rules

### Password
- Minimum 6 characters
- Must contain uppercase, lowercase, number (recommended)

### Email
- Valid email format
- Unique across system

### Post/Journal Content
- Max 5000 characters (posts)
- Max 10000 characters (journals)
- Cannot be empty

### Mood Values
- Valid values: `terrible`, `bad`, `okay`, `good`, `excellent`
- Intensity: 1-10 integer

---

## 🔐 CORS

Allowed origins:
- `http://localhost:5173` (development)
- `http://localhost:3000` (alternative)
- Production domain (configured in .env)

---

## 📋 Example Workflow

```bash
# 1. Register
curl -X POST http://localhost:5002/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"Pass123"}'

# Save token from response

# 2. Create post
TOKEN="eyJhbGc..."
curl -X POST http://localhost:5002/api/posts \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Hello","content":"Test post","category":"general","isAnonymous":true}'

# 3. Get posts
curl http://localhost:5002/api/posts?category=general

# 4. Add mood
curl -X POST http://localhost:5002/api/mood \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mood":"good","intensity":8}'

# 5. Get stats
curl http://localhost:5002/api/mood/stats \
  -H "Authorization: Bearer $TOKEN"
```

---

For more examples, see implementation files in `backend/src/controllers/`.
