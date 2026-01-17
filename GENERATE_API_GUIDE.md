# 🚀 /generate/ API Integration Guide

**Created:** 2025-12-24  
**Project:** AnToAnt Landing Page - AI Dashboard

---

## 📡 API Endpoint

### **POST** `/generate/`

**Full URL (proxied):** `http://localhost:8006/generate/`

---

## 📤 Request Format

### Headers

```
Content-Type: application/json
Accept: application/json
```

### Request Body

```json
{
  "project_name": "string",
  "description": "string",
  "tech_stack": ["string"],
  "requirements": "string",
  "use_case": "string"
}
```

### Example Request

```json
{
  "project_name": "E-commerce Platform",
  "description": "Build a scalable e-commerce platform with microservices",
  "tech_stack": ["React", "Node.js", "PostgreSQL", "Redis"],
  "requirements": "User authentication, product catalog, shopping cart, payment integration",
  "use_case": "Online retail business with high traffic"
}
```

---

## 📥 Response Format

### Success Response (200 OK)

```json
{
  "project_name": "E-commerce Platform",
  "description": "Build a scalable e-commerce platform with microservices",
  "tech_stack": [
    "React",
    "Node.js",
    "PostgreSQL",
    "Redis"
  ],
  "requirements": "User authentication, product catalog, shopping cart, payment integration",
  "use_case": "Online retail business with high traffic",
  "result": {
    "architecture": "...",
    "nodes": [...],
    "edges": [...]
  }
}
```

### Error Response (500 Internal Server Error)

```json
{
  "detail": "Generation failed after 3 attempts: Error calling model 'gemini-2.5-flash' (INVALID_ARGUMENT): 400 INVALID_ARGUMENT. {'error': {'code': 400, 'message': 'API key not valid. Please pass a valid API key.', 'status': 'INVALID_ARGUMENT', ...}}"
}
```

---

## 🔧 Configuration

### 1. Vite Proxy Configuration

**File:** `vite.config.ts`

```typescript
'/generate': {
  target: 'http://localhost:8006',
  changeOrigin: true,
  rewrite: (path) => path
}
```

This routes all `/generate/` requests from localhost:5173 → localhost:8006

---

## 💻 Frontend Implementation

### Location

**File:** `src/features/AnToAnt-ai/components/AnToAntAi/dashboard/main.tsx`

### How It Works

1. **User Input Detection**

   - Detects architecture-related keywords: `architecture`, `flow`, `diagram`, `tech`, `stack`, `project`, `create`, `build`, `generate`

2. **API Call**

   ```typescript
   fetch("/generate/", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       Accept: "application/json",
     },
     body: JSON.stringify({
       project_name: userMsg,
       description: userMsg,
       tech_stack: ["React", "Node.js", "PostgreSQL"],
       requirements: userMsg,
       use_case: userMsg,
     }),
   });
   ```

3. **Response Handling**
   - **Success:** Displays formatted architecture in chat
   - **Error:** Shows user-friendly error message with specific guidance

### Display Format

When successful, the response is displayed as:

```
✅ Architecture generated successfully!

📋 **Project Name:** E-commerce Platform

📝 **Description:** Build a scalable e-commerce platform...

🛠️ **Tech Stack:**
  • React
  • Node.js
  • PostgreSQL
  • Redis

📌 **Requirements:** User authentication, product catalog...

🎯 **Use Case:** Online retail business with high traffic
```

---

## ⚠️ Error Handling

### Common Errors

#### 1. **Invalid API Key** (Current Issue)

```json
{
  "detail": "Generation failed after 3 attempts: Error calling model 'gemini-2.5-flash'... API key not valid..."
}
```

**User Message:**

```
❌ Failed to generate architecture.

⚠️ Backend API key issue: The Gemini API key is invalid or missing.
Please check your backend configuration.
```

**Solution:** Configure valid Gemini API key in backend environment variables

#### 2. **Network Error**

**User Message:**

```
❌ Failed to generate architecture.

🔍 Error: Failed to fetch
```

**Solution:** Ensure backend server is running on localhost:8006

#### 3. **Server Error (500)**

**User Message:**

```
❌ Failed to generate architecture.

⚠️ The AI service encountered an error. Please try again or contact support.
```

---

## 🧪 Testing

### Test the API

1. **Start Backend**

   ```bash
   # Make sure your backend is running on port 8006
   ```

2. **Start Frontend**

   ```bash
   bun dev
   ```

3. **Test in Dashboard**
   - Navigate to `/dashboard`
   - Type: "Create an e-commerce architecture"
   - Press Enter or click Send

### Expected Behavior

**If API Key is Valid:**

- Shows "🤔 Generating architecture..."
- Returns formatted response with project details
- Updates React Flow diagram (if result.nodes/edges provided)

**If API Key is Invalid (Current State):**

- Shows "🤔 Generating architecture..."
- Shows error message explaining the API key issue

---

## 🎨 UI Features

### Chat Interface

- **User messages:** Right-aligned, black background
- **AI responses:** Left-aligned, gray background
- **Loading state:** Shows generating message
- **Error state:** Shows ❌ with detailed error info
- **Success state:** Shows ✅ with formatted data

### Response Formatting

- Uses emoji icons for visual clarity
- Markdown-style formatting with **bold** labels
- Bullet points for tech stack items
- Clean spacing and readability

---

## 🔑 Required Backend Configuration

### Environment Variables (Backend)

```env
GEMINI_API_KEY=your_valid_gemini_api_key_here
```

### Backend Endpoint Requirements

1. Accept POST requests to `/generate/`
2. Parse JSON request body
3. Call Gemini API with valid credentials
4. Return structured response or error details

---

## 📊 Data Flow

```
User Input → Frontend Dashboard
     ↓
  Keyword Detection
     ↓
  POST /generate/ (proxied via Vite)
     ↓
  http://localhost:8006/generate/
     ↓
  Backend Processing → Gemini API
     ↓
  Response (JSON)
     ↓
  Frontend Display (Formatted Chat)
     ↓
  Optional: Update React Flow Diagram
```

---

## 🚧 Current Status

✅ **Configured:**

- Vite proxy for `/generate/` endpoint
- Frontend API call implementation
- Error handling with user-friendly messages
- Response formatting and display

⚠️ **Issue:**

- Backend Gemini API key is invalid
- Need to configure valid API key in backend

---

## 🔧 Customization Options

### 1. **Extract Tech Stack from User Input**

Currently hardcoded to `["React", "Node.js", "PostgreSQL"]`

You can parse user input to extract specific technologies:

```typescript
// Example: Extract tech stack from message
const extractTechStack = (message: string) => {
  const techs = ["React", "Node.js", "Python", "PostgreSQL", "MongoDB"];
  return techs.filter((tech) =>
    message.toLowerCase().includes(tech.toLowerCase())
  );
};
```

### 2. **Add Loading Animation**

Show a more sophisticated loading state while API is processing

### 3. **Display Architecture Diagram**

If `data.result` contains nodes/edges, it automatically updates the React Flow diagram

---

## 📝 Notes

1. **Proxy Configuration:** Requires Vite dev server restart after changes
2. **Error Messages:** Specific error handling for API key, generation failures, and network issues
3. **Response Format:** Flexible - handles both the expected JSON format and additional fields
4. **TypeScript:** Added proper type annotations for type safety

---

## 🐛 Troubleshooting

### "Failed to fetch"

- Check if backend is running: `curl http://localhost:8006/generate/`
- Verify Vite dev server is running
- Check browser console for CORS errors

### "API key not valid"

- Configure `GEMINI_API_KEY` in backend environment
- Verify API key is active in Google Cloud Console
- Check backend logs for detailed error

### No response displayed

- Check browser console for errors
- Verify request body format matches backend expectations
- Test API directly with curl/Postman

---

**Next Steps:**

1. Configure valid Gemini API key in backend
2. Test the integration end-to-end
3. Customize request body based on user input parsing
4. Add more sophisticated architecture visualization
